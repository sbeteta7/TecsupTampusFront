import Header from "../organisms/Header";
import HomeCP from "../organisms/HomeCP";
import Footer from "../organisms/Footer";
import HomeCP_02 from "../organisms/HomeCP_02";
import { AuthProvider } from "../Context/Context";
function Home() {

  return (
    <>
      <div>
        
          <Header/>
          <HomeCP/>
          <HomeCP_02/>
          <Footer/>
        
      </div>
    </>
  )
}

export default Home;