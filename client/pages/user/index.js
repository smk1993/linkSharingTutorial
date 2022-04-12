import Layout from '../../components/Layout'
import axios from 'axios';
import { API } from '../../config'
import { getCookie } from '../../helpers/auth';
const User = ({ user }) => (<Layout>{JSON.stringify(user)}</Layout>)

User.getInitialProps = async () => {
    const token = getCookie('token');
    console.log(token);
    
        const response = await axios.get(`${API}/user`, {
            headers: {
                authorization: `Bearer ${token}`,
                contentType: 'application/json'
            }
        });
        if (response.status === 401) {
            return { user: 'no user' };
        }
        return { user: response.data };
}

export default User