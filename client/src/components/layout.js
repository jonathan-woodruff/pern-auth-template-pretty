import { Header } from './header';

const Layout = ( {children} ) => {
    return (
        <div>
            <Header />
            <div className='container'>{ children }</div>
        </div>
    )
};

export default Layout;