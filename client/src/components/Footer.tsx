import LocationOnIcon from '@mui/icons-material/LocationOn'
import EmailIcon from '@mui/icons-material/Email'
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled'

function Footer() {
  return (
    <div className="bg-night p-24 justify-center items-center text-white text-sm grid gap-20 grid-cols-1 md:grid-cols-4">
      <div className="col-span-2">
        <img className="h-16" src="/farmfresh-logo-without-bg.png" alt="" />
        <p className="pt-4">
          An innovative platform empowering farmers to showcase their yields and
          enabling consumers to easily explore and purchase freshly grown
          produce. We bridge the gap, connecting farms to tables, ensuring the
          accessibility of high-quality, locally sourced fruits and vegetables
          for a healthier, more sustainable lifestyle.
        </p>
      </div>
      <div className="col-span-1 flex flex-col gap-1">
        <h4 className="text-bold uppercase">Our Social Media</h4>
        <p>LinkedIn</p>
        <p>Gtihub</p>
        <p>Instagram</p>
        <p>Facebook</p>
      </div>
      <div className="col-span-1 flex flex-col gap-2">
        <h4 className="text-bold uppercase">Contact us</h4>
        <div className="flex gap-1">
          <LocationOnIcon style={{ color: '#fff' }} />
          <p>Silicon Oasis, Dubai, UAE</p>
        </div>
        <div className="flex gap-1">
          <EmailIcon style={{ color: '#fff' }} />
          <p>helpdesk@farmfreshfinder.com</p>
        </div>
        <div className="flex gap-1">
          <PhoneEnabledIcon style={{ color: '#fff' }} />
          <p>+971501234567</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
