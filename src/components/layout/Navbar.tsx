import Link from "next/link";
import DrawerPost from "../post/DrawerPost";
import DrawerCategory from "../category/DrawerCategory";

const Navbar = () => {
    return ( 
        <nav className="flex justify-between p-5">
            <div className="flex gap-2">
                <Link href="/">Liste des posts</Link>
                <Link href="/categories">Liste des catégories</Link>
            </div>
            
            <div className="flex gap-2">
                <DrawerPost />
                <DrawerCategory/>
            </div>
            
        </nav>
     );
}
 
export default Navbar;