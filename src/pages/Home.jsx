
import { Link } from 'react-router-dom'
import BackgroundImage from '../assets/images/background.jfif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faClipboardCheck, faDiagramProject, faGlobeAfrica, faMagnifyingGlass, faMoneyBill1Wave, faSignal, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons'
import Logo from '../assets/logos/logo.png'
import Tech from '../assets/images/Tech.jpg'
import Business from '../assets/images/Support.jpg'
import Writing from '../assets/images/Writing.jpg'
import Creative from '../assets/images/Creative.jpg'
import Local from '../assets/images/Local.jpg'
import Macketing from '../assets/images/Marketing.jpg'
import LayerBackgroundImage from '../assets/images/Bgimage.jfif'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'

const BulletPoint = ({icon, label}) => (
      <div className='size-50 flex flex-col items-center justify-evenly bg-white shadow-lg rounded-xl p-2 text-sm cursor-pointer'>
        <FontAwesomeIcon icon={icon} className='text-6xl text-green-700'/>
        <p>{label}</p>
      </div>
    );

  const StepsGuide = ({icon, label}) => (
    <div className='flex items-center justify-around p-2 w-60 border border-green-700 rounded-2xl text-sm cursor-pointer'>
      <FontAwesomeIcon icon={icon} className='text-green-700'/>
      <p>{label}</p>
    </div>
  );

  const Categories = ({img, label}) =>(
    <div className='bg-white h-50 w-40 md:w-55 flex flex-col items-center justify-between p-2 border border-green-700 rounded-xl'>
      <img src={img}  className='size-30 rounded'/>
      <p className='text-xl font-medium'>{label}</p>
    </div>
  );

  const Indicators = ({icon,count,label}) => (
      <div className='md:size-40 size-30 flex flex-col items-center justify-center bg-white rounded m-auto p-2 text-sm cursor-pointer'>
        <FontAwesomeIcon icon={icon} className='text-6xl text-green-700'/>
        <p className='text-xl font-semibold'>{count}</p>
        <p className='font-medium'>{label}</p>
      </div>
    );

    const FooterCol = ({headind, label1, label2, label3, label4, link1="", link2="", link3="", link4=""}) => (
      <div className='cursor-pointer flex flex-col'>
        <h3 className='font-medium'>{headind}</h3>
        <a href={link1}>{label1}</a>
        <a href={link2}>{label2}</a>
        <a href={link3}>{label3}</a>
        <a href={link4}>{label4}</a>
      </div>
    );


function Home() {

  return (
    <>
    <Navbar />
    <section className="w-full h-screen md:h-96 bg-center bg-cover relative" 
    style={{backgroundImage: `linear-gradient(rgba(0,9,0,0.5),rgba(0,9,0,0.9)),url(${BackgroundImage})`}}
    >
        <div className='w-full flex items-center justify-center flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        gap-4 p-2 text-center'>
            <h1 className='text-4xl font-bold text-white '>Connect With Real Work. Build Real Income</h1>
            <h3 className='text-2xl font-semibold text-white'>WorkConnect links skilled people to real-time job opportunities — fast, simple, and trustworthy</h3>
            <Link to="/register" className='text-white'>
            <button className='bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition md:block'
          >Get Started</button></Link>
        </div>
    </section>
    <section className='md:min-h-84 text-center text-pretty px-2 py-6 bg-[#e0ffe9]'>
      <h1 className='text-3xl font-semibold md:text-4xl md:font-bold py-3'>Why Workconnect</h1>
      <h2 className='text-xl md:text-2xl font-semibold my-2'>Why people choose workconnect</h2>
      <div className='flex flex-col md:flex-row items-center justify-between gap-4 mt-2'>
        <BulletPoint icon={faCheckCircle} label="Verified opportunities only — no fake jobs, no long stories" />
        <BulletPoint icon={faUsers} label="Professional connections — link up with clients who actually pay" />
        <BulletPoint icon={faDiagramProject} label="Simple workflow — sign up, apply, get hired, done" />
        <BulletPoint icon={faGlobeAfrica} label="Built for Africa's workforce — reliable, transparent, and easy to use" />
      </div>
    </section>
    <section id='steps' className='h-screen md:h-72 flex flex-col items-center justify-center text-center text-pretty p-2 bg-[#F0FDF4]'>
      <h2 className='text-2xl font-semibold my-2'>How it Works</h2>
      <div className='flex flex-col md:flex-row items-center justify-between mt-10 gap-4'>
        <StepsGuide icon={faUserPlus} label="Create your profile"/>
        <StepsGuide icon={faMagnifyingGlass} label="Browse Available Work" />
        <StepsGuide icon={faClipboardCheck} label="Accept Task" />
        <StepsGuide icon={faMoneyBill1Wave} label="Deliver and get paid" />
      </div>
    </section>
    <section className='md:min-h-84 text-center text-pretty p-2 bg-[#e0ffe9]'>
      <h2 className='text-3xl font-semibold'>Featured Categories</h2>
      <div className= 'h-full grid grid-cols-2 md:grid-cols-3 place-items-center gap-2 my-4'>
        <Categories img={Tech} label="Tech & Digital Work" />
        <Categories img={Business} label="Business Support" />
        <Categories img={Writing} label="Writing & Editing" />
        <Categories img={Creative} label="Creative Services" />
        <Categories img={Local} label="Local Services" />
        <Categories img={Macketing} label="Marketing & Sales" />
      </div>
    </section>
    <section className='md:h-96 flex flex-col items-center justify-center bg-center bg-cover relative p-4'
     style={{backgroundImage: `linear-gradient(rgba(0,75,0,0.6),rgba(0,70,0,0.9)),url(${LayerBackgroundImage})`}}
    >
     <div className='grid grid-cols-2 md:grid-cols-4 gap-4 justify-between w-full'>
      <Indicators icon={faCheckCircle} count="2,400+" label="verified workers"/>
      <Indicators icon={faMoneyBill1Wave} count="1,100+" label="Jobs Completed"/>
      <Indicators icon={faSignal} count="300+" label="Active Followers"/>
      <Indicators count="4.8⭐" label="Average Rating"/>
     </div>
     <div className='flex flex-col md:flex-row items-center justify-between w-full md:w-1/3 m-10 p-2'>
      <p className='text-xl text-white'>Ready to Get Started?</p>
      <Link to="/register" className='text-white'>
            <button className='bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition md:block'
          >Get Started</button></Link>
     </div>
    </section>
    <section id='footer' className='h-screen flex flex-col justify-between bg-[#e0ffe9]'>
      <div className='flex items-center justify-evenly'>
        <div className='p-4 flex flex-col items-start'>
       <div className='flex items-center'> 
        <img src={Logo} alt="workconnect-logo" className='size-20'/>
       <h1 className='text-4xl font-bold text-pretty'>Workconnect</h1>
       </div>
        <div>
          WorkConnect connects skilled professionals with real job opportunities,<br/> making hiring and getting hired simple, fast, and reliable.
        </div>
      </div>
      <div>
       <h2 className='text-xl font-semibold'>Contant Us</h2>
        <p>Email: <a href="">supportworkconnect@gmail.com</a></p>
        <p>Phone: +2348078483295</p>
      </div>
      </div>
      <div className='w-full grid grid-cols-2 md:grid-cols-4 items-center justify-evenlyn gap-5 p-4'>
       <FooterCol headind="WorkConnect" label1="About Us" label2="Careers" label3="Blog" label4="Help Center" />
       <FooterCol headind="For Workers" label1="Find Work" label2="Skill Assessment" label3="Profile Tips" label4="Support" />
       <FooterCol headind="For Clients" label1="Hire Talent" label2="Pricing" label3="Post a Job" label4="Contact Sales" />
       <FooterCol headind="Legal" label1="Terms of Service" label2="Privacy Policy" label3="Community Guidelines" />
      </div >
      <Footer />
    </section>
    </>
  )
}

export default Home
