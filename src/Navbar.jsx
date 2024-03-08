import './Navbar.css'
import ring from './assets/ring.png'

const Navbar = () => {
    return ( 
        <header>
            <nav>
                <div style={{display: 'flex', justifyConten: 'center', alignItems: 'center'}}>
                <img src={ring} />
                <p style={{fontSize: '23px'}}>NaziShop</p>
                </div>
                <p>შესვლა</p>
            </nav>
        </header>
     );
}
 
export default Navbar;