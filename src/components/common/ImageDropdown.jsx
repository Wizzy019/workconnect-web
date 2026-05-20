import React, { useState, useRef, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faImage,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";

const STORAGE_BUCKET = "workconnect_profiles_images";
const PROFILE_TABLE = "workconnect_profiles";
const MATCH_COLUMN = "id";
const PROFILE_URL_COLUMN = "profile_image_url";
const COVER_URL_COLUMN = "cover_image_url";

const ImageDropdown = ({ onError, onSucces, onSuccess }) => {
  const { user, profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const notifySuccess = onSuccess || onSucces;

  const extractStoragePathFromUrl = (url) => {
    if (!url) return null;

    const marker = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
    const markerIndex = url.indexOf(marker);
    if (markerIndex === -1) return null;

    const fullPath = url.slice(markerIndex + marker.length);
    const [pathWithoutQuery] = fullPath.split("?");
    return pathWithoutQuery || null;
  };

  const uploadImage = async (file, folder) => {
    if (!user?.id) throw new Error("User not found");
    if (!file) throw new Error("No file selected");
    if (!file.type?.startsWith("image/")) {
      throw new Error("Only image files are allowed");
    }

    const extFromName = file.name?.includes(".")
      ? file.name.split(".").pop()?.toLowerCase()
      : "";
    const extFromType = file.type.split("/")[1]?.toLowerCase() || "png";
    const extension = extFromName || extFromType;
    const uniquePart =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const filePath = `${folder}/${user.id}-${uniquePart}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, { contentType: file.type });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    return { publicUrl: data.publicUrl, filePath };
  };

  const handleImageUpload = async (file, imageType) => {
    if (loading) return;
    setLoading(true);

    try {
      const folder = imageType === "profile" ? "profile" : "cover";
      const urlColumn =
        imageType === "profile" ? PROFILE_URL_COLUMN : COVER_URL_COLUMN;
      const previousUrl = profile?.[urlColumn] || null;
      const { publicUrl } = await uploadImage(file, folder);

      const { data: updatedRow, error: dbError } = await supabase
        .from(PROFILE_TABLE)
        .update({ [urlColumn]: publicUrl })
        .eq(MATCH_COLUMN, user.id)
        .select(MATCH_COLUMN)
        .maybeSingle();

      if (dbError) throw dbError;
      if (!updatedRow) {
        throw new Error("Profile row update failed. No matching row found.");
      }

      const previousPath = extractStoragePathFromUrl(previousUrl);
      if (previousPath) {
        const { error: removeError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .remove([previousPath]);
        if (removeError) {
          console.warn("Old image cleanup failed:", removeError.message);
        }
      }

      await refreshProfile();
      setIsOpen(false);

      notifySuccess?.("Profile updated successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      onError?.(err.message || "An error occurred during upload");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 bg-white shadow-sm transition-all"
      >
        <FontAwesomeIcon icon={faCamera} className="text-[#1dbf73]" />
        <span>Add / Change Picture</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`text-[10px] transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in duration-200">
          <button
            type="button"
            onClick={() => profileInputRef.current?.click()}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FontAwesomeIcon icon={faImage} className="text-[#1dbf73] w-4" />
            <div className="flex flex-col items-start">
              <span className="font-bold">Profile Photo</span>
              <span className="text-[11px] text-gray-400">
                Update your avatar
              </span>
            </div>
          </button>
          <input
            type="file"
            accept="image/*"
            ref={profileInputRef}
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file, "profile");
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FontAwesomeIcon icon={faImage} className="text-[#1dbf73] w-4" />
            <div className="flex flex-col items-start">
              <span className="font-bold">Cover Photo</span>
              <span className="text-[11px] text-gray-400">
                Update your banner image
              </span>
            </div>
          </button>

          <input
            type="file"
            accept="image/*"
            ref={coverInputRef}
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file, "cover");
              e.target.value = "";
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageDropdown;
