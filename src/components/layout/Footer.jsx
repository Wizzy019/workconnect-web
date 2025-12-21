import { faFacebook, faInstagram, faPinterest, faTiktok, faXTwitter, } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

 const FaIcon = ({icon}) => (
        <FontAwesomeIcon icon={icon} className="text-green-700"/>
 );

function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between p-4 cursor-pointer">
      <h2 className='text-2xl font-bold cursor-pointer mb-10'>WorkConnect</h2>
    <div className="flex items-center justify-evenly gap-2 my-2">
    <FaIcon icon={faEnvelope} />
    <FaIcon icon={faFacebook} />
    <FaIcon icon={faXTwitter} />
    <FaIcon icon={faInstagram} />
    <FaIcon icon={faTiktok} />
    <FaIcon icon={faPinterest} />
    </div> 
    <h2 className="">© 2025 WorkConnect. All rights reserved</h2>
    </footer>
  )
}

export default Footer