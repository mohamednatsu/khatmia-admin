
import { Routes , Route } from 'react-router-dom'
import Navbar from './components/navbar'
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
import Login from './components/Login'
import { useEffect, useState } from 'react'
import Photos from './pages/Photos'
import Cookies from 'js-cookie'
import UploadLectures from './pages/UploadLectures'
import UploadInvest from './pages/UploadInvest'
import UploadMainscure from './pages/UploadMainscure'
import Invests from './pages/Invests'
import Manuscript from './pages/Manuscript'
import EditNew from './pages/EditNews'
import UploadSoundFile from './pages/UploadSoundFile'
import Sounds from './pages/Sounds'
import UploadSoundLink from './pages/UploadSoundLink'




export default function App() {

  const [token, setToken] = useState(false);

  useEffect(() => {
    const savedUsername = Cookies.get('token');
    if (savedUsername) {
      setToken(savedUsername);
      
    }
  }, [token]);


  return (
    <div className=' mx-auto container'>
      {
        token ? (
          <>  
      <Navbar />
      <Routes>
        <Route path="/admin" element={<Upload />} />
        <Route path="/admin/books" element={<ShowBooks />} />
        <Route path="/admin/upload-news" element={<UploadNews />} />
        <Route path="/admin/upload-video" element={<UploadVideo />} />
        <Route path="/admin/upload-sound-file" element={<UploadSoundFile />} />
        <Route path="/admin/upload-sound-link" element={<UploadSoundLink />} />
        <Route path="/admin/sounds" element={<Sounds />} />
        <Route path="/admin/news" element={<News />} />
        <Route path="/admin/edit-news" element={<EditNew />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/upload-event" element={<Events />} />ْ
        <Route path="/admin/videos" element={<Videos />} />ْ
        <Route path="/admin/upload-photo" element={<UploadPhoto />} />
        <Route path="/admin/events" element={<AllEvents />} />
        <Route path="/admin/fatwa" element={<Allfatwa />} />
        <Route path="/admin/contact" element={<AllContact />} />
        <Route path="/admin/reply" element={<Reply />} />
        <Route path="/admin/photos" element={<Photos />} />
        <Route path="/admin/invest" element={<Invests />} />
        <Route path="/admin/upload-invest" element={<UploadInvest />} />
        <Route path="/admin/upload-manuscript" element={<UploadMainscure />} />
        <Route path="/admin/manuscripts" element={<Manuscript />} />
        <Route path="/admin/upload-lecture" element={<UploadLectures />} />
      </Routes>
          </>
        ) : (
          <>
          <Navbar />
          <Login />
          </>
        )
      }
      
    </div>
  )
}
