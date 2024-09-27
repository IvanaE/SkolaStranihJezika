import cn from "../constants.json";

const Footer = () => {
    return (
        <footer className="footer container-fluid text-white">
            <div className="container py-4">
                <div className="row">
                    <div className="col-12 text-center">{cn.footer.title}</div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;