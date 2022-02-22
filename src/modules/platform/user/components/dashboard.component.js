import { Link } from 'react-router-dom';
import './dashboard.component.css';

const Dashboard = (props) => {
    return (
        <>
            <Link to="/platform" style={{ color: 'black' }}>
                <div
                    className="card text-center mt-5  hvr-grow-shadow hvr-round-corners"
                    style={{
                        width: '200px',
                        height: '300px',
                        marginLeft: '50px',
                        cursor: 'pointer',
                        borderRadius: '1em',
                    }}
                >
                    <div
                        className="hvr-sweep-to-bottom"
                        style={{
                            display: 'flex',
                            height: '100%',
                        }}
                    >
                        <div
                            className="card-body"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <h3 className="card-title">Platform</h3>
                        </div>
                    </div>
                </div>
            </Link>

            {/* <Link to="/src/modules/complain/components/complains.component.js" style={{ color: 'black' }}> */}
            <Link to="/platform" style={{ color: 'black' }}>
                <div
                    className="card text-center mt-5  hvr-grow-shadow hvr-round-corners"
                    style={{
                        width: '200px',
                        height: '300px',
                        marginLeft: '50px',
                        cursor: 'pointer',
                        borderRadius: '1em',
                    }}
                >
                    <div
                        className="hvr-sweep-to-bottom"
                        style={{
                            display: 'flex',
                            height: '100%',
                        }}
                    >
                        <div
                            className="card-body"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <h3 className="card-title">Complain</h3>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default Dashboard;
