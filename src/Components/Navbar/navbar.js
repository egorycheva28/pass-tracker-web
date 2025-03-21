import { Dropdown, Menu } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutThunkCreator } from '../../reducers/userReducer';

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const lastName = localStorage.getItem('lastName');
    const firstName = localStorage.getItem('firstName');
    const middleName = localStorage.getItem('middleName');
    const role = localStorage.getItem('role');

    const logout = async () => {
        await dispatch(logoutThunkCreator());
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('lastName');
        localStorage.removeItem('firstName');
        localStorage.removeItem('middleName');
        localStorage.removeItem('role');
        navigate('/login');
    };

    const items = [
        { label: <Link to="/profile">Профиль</Link>, key: "profile" },
        { label: <button style={{ background: 'none', border: 'none' }} onClick={logout}>Выход</button>, key: "logout" }
    ];

    const menu = (
        <Menu items={items} />
    );

    return (
        <nav style={{ justifyContent: "space-between", padding: 0, background: '#001529', borderBottom: '1px solid grey', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 2, display: 'flex', color: 'white' }}>
            <div style={{ display: 'flex' }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '12px', marginLeft: '70px' }}>
                    <path d="M10.5717 21.5561V9.38483H16.5635V21.946C16.5635 23.8163 17.79 25.7371 20.2158 25.7371C22.6119 25.7371 23.8398 23.8163 23.8398 
                    21.946V9.38483H29.83V21.5263C29.83 26.3781 26.7914 31.1487 20.2158 31.1487C13.6403 31.1487 10.5717 26.3781 10.5717 21.5561Z" fill="rgb(231, 53, 89)"></path>
                    <path d="M35.7137 2.02211H32.7731L30.8185 2.56057V3.26023H24.4104V2.52086L22.4473 1.76182H20.8566L20.5242 1.58057C20.5352 1.5472 20.5453 
                    1.51313 20.5453 1.47615C20.5453 1.33514 20.457 1.21569 20.3333 1.1669V0H20.0865V1.16725C19.9637 1.21705 19.8773 1.33581 19.8773 
                    1.47615C19.8773 1.51243 19.887 1.54615 19.8978 1.57885L19.5617 1.76182H17.8964L16.0271 2.54859V3.26023H9.57668V2.56261L7.6225 
                    2.02211H4.68148L2.72729 2.56296V5.3657V22.6884C2.72729 32.2341 10.4933 40 20.0389 40H20.363C29.9087 40 37.6744 32.2341 37.6744 
                    22.6884V3.62442H37.6683V2.56552L35.7137 2.02211ZM35.1794 22.6884C35.1794 30.8582 28.5326 37.5046 20.363 37.5046H20.0389C11.869 
                    37.5046 5.22264 30.8582 5.22264 22.6884V5.64296H35.1794V22.6884H35.1794Z" fill="rgb(231, 53, 89)"></path>
                </svg>
                <h2 style={{ marginLeft: 10, marginRight: 20, marginTop: '15px', whiteSpace: 'nowrap', color: 'rgb(231, 53, 89)' }}>Pass-tracker</h2>
                {token && role == 4 ? (
                    <Link to="/confirmUser" style={{ marginInline: 20, color: 'white', marginTop: '20px', whiteSpace: 'nowrap' }}>Пользователи</Link>
                ) : (
                    null
                )}
                {token && (role == 'Deanery' || role == 4) ? (
                    <Link to="/role" style={{ marginInline: 20, color: 'white', marginTop: '20px', whiteSpace: 'nowrap' }}>Роли</Link>
                ) : (
                    null
                )}
                {token && role == 'Teacher' ? (
                    <Link to="/listStudents" style={{ marginInline: 20, color: 'white', marginTop: '20px', whiteSpace: 'nowrap' }}>Пропуски</Link>
                ) : (
                    null
                )}
                {token && role == 'Deanery' ? (
                    <Link to="/approvedApplications" style={{ marginInline: 20, color: 'white', marginTop: '20px', whiteSpace: 'nowrap' }}>Пропуски</Link>
                ) : (
                    null
                )}
                {token && (role == 'Deanery' || role == 4) ? (
                    <Link to="/unapprovedApplications" style={{ marginInline: 20, color: 'white', marginTop: '20px', whiteSpace: 'nowrap' }}>Заявки</Link>
                ) : (
                    null
                )}
            </div>
            {token ? (
                <Dropdown overlay={menu} trigger={['click']}>
                    <p style={{ marginInline: 70, color: 'white', marginTop: '20px', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                        {lastName + ' ' + firstName + '. ' + middleName + '.'}
                    </p>
                </Dropdown>
            ) : (
                <Link to="/login" style={{ marginInline: 70, color: 'white', marginTop: '20px', whiteSpace: 'nowrap' }}>
                    Вход
                </Link>
            )}
        </nav>
    );
}

export default Navbar;