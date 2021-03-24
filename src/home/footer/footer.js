import { Layout } from 'antd';
import moment from 'moment';

import './footer.css';

const { Footer } = Layout;

function SiteFooter() {

    return (
        <Footer style={{ textAlign: 'center' }}><p>Copyright &copy; {moment().format("YYYY")} *TestCompany*, Inc. All Rights Reserved.</p></Footer>
    );
}

export default SiteFooter;