
import { Routes , Route } from 'react-router-dom'
import Navbar from './components/navbar'
import UploadSound from './pages/UploadSound'
import Upload from './pages/upload'
import ShowBooks from './pages/showBooks'
import UploadNews from './pages/UploadNews'
import News from './pages/News'
import UploadVideo from './pages/UploadVideo'
import Users from './pages/Users'
import Events from './pages/Event'
import AllEvents from './pages/showEvents'
import UploadPhoto from './pages/UploadPhoto'
import Videos from './pages/Videos'
import AllContact from './messages/contact'
import Reply from './messages/reply'
import Allfatwa from './messages/fatwa'



export default function App() {
  return (
    <div className=' mx-auto container'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/upload-sound" element={<UploadSound />} />
        <Route path="/books" element={<ShowBooks />} />
        <Route path="/upload-news" element={<UploadNews />} />
        <Route path="/upload-video" element={<UploadVideo />} />
        <Route path="/news" element={<News />} />
        <Route path="/users" element={<Users />} />
        <Route path="/upload-event" element={<Events />} />ْ
        <Route path="/videos" element={<Videos />} />ْ
        <Route path="/upload-photo" element={<UploadPhoto />} />
        <Route path="/events" element={<AllEvents />} />
        <Route path="/fatwa" element={<Allfatwa />} />
        <Route path="/contact" element={<AllContact />} />
        <Route path="/reply" element={<Reply />} />
      </Routes>
    </div>
  )
}
