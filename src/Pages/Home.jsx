import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { FadeLoader, ScaleLoader } from 'react-spinners';
import ReactImageFallback from 'react-image-fallback';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [userInfo, setUserInfo] = useState();
    const [loading, setLoading] = useState(true);
    const brokenImg = 'https://i.ibb.co/xSj0y8W/images-2.png' || 'No data SHow';
    // const initialimg='https://i.ibb.co/6v2f3x5/abstract-surface-textures-white-concrete-stone-wall-74190-8189.jpg';
    const [activeIndex, setaActiveIndex] = useState(null);



    useEffect(() => {
        // Using Axios to fetch data
        axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users')
            .then(response => {
                console.log(response.data);
                setUsers(response.data);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false on error as well
            });
    }, []);



    const handleDetails = (user, index) => {
        console.log(user, "userinfo");
        setUserInfo(user);
        setaActiveIndex(index); // Set the active user ID
    };

    return (
        <Container>
            {/* User List Div----- */}
            <Row className='p-2 p-md-0 p-lg-0 d-flex' style={{ marginTop: "10px" }}>
                <Col xs={6} >
                <div  style={{color:"white", backgroundColor: "#016064", borderRadius: "6px", padding: "2px"  }}>
    <p className='text-center fs-3 p-1 p-md-0 p-lg-0 '>User List</p>
</div>


                    {loading ? (
                        // Display Spinner while loading data

                        <ScaleLoader className='d-flex justify-content-center align-items-center' size={1009} style={{ marginTop: '100px', marginBottom: "30px" }} color="blue " />
                    ) : (
                        users.map((user, index) =>
                            <div
                                key={user.createdAt}
                                onClick={() => handleDetails(user, index)}
                                style={{
                                    backgroundColor: activeIndex === index ? "#C9BB8E" : "#ECECEC",
                                    cursor: 'pointer',
                                }}

                                className='d-block d-md-flex d-lg-flex align-items-center gap-0 gap-md-3 gap-lg-3 mt-3 p-2 p-md-0 p-lg-0  '
                            >

                                <p className='mt-0 mt-md-3 mt-lg-3 d-flex justify-content-center '>

                                    <ReactImageFallback
                                        src={user.avatar}
                                        fallbackImage={brokenImg}
                                        initialImage={brokenImg}
                                        alt="img not found"
                                        className="my-image"
                                        style={{ height: "50px", width: "50px", borderRadius: "150px", border: "1px solid #151E3D" }} />


                              
                              



                                </p>

                                <p className='mt-0 mt-md-3 mt-lg-3 text-center'>{user?.profile?.firstName || 'no data found'} {user?.profile?.lastName || 'no data found'}</p>
                            </div>
                        )
                    )}
                </Col>

                {/* User Details Div----- */}
                <Col  >

                    <div className='w-50 w-md-50 w-lg-50 pe-5 mb-5' style={{ position: "fixed" }} >
                        <div style={{color:'white', backgroundColor: "#016064", borderRadius: "6px", padding: "2px" }}>
                            <p className='text-center fs-3 p-1 p-md-0 p-lg-0'>User Details</p>
                        </div>
                        {userInfo ?

                            <div style={{ border: "1px dotted pink" }} className='px-2 px-md-5 px-lg-5 '>


                                <div key={userInfo.createdAt}>
                                    <div className='my-3'>
                                        <p className='d-flex justify-content-center'>

                                            <ReactImageFallback
                                                src={userInfo.avatar}
                                                fallbackImage={brokenImg}
                                                initialImage={brokenImg}

                    // initialImage={<FadeLoader color={"#123abc"} loading={true} />}
                                                alt="img not found"
                                                className="my-image"
                                                style={{ height: "120px", width: "120px", borderRadius: "150px", border: "1px dotted #151E3D" }} />

                                           



                                        </p>
                                        <h6 className='text-center'>@{userInfo?.profile?.username || 'no data found'}</h6>


                                    </div>
                                    <div className='mb-2' style={{ backgroundColor: "#DBDBDB", border: "1px solid teal", borderRadius: "5px" }}>
                                        <p className='p-2 '> {userInfo.Bio}</p>
                                    </div>
                                    <div>
                                        <p>Full Name</p>
                                        <p className='p-2' style={{ borderRadius: '8px', border: '1px solid teal', background: '#DBDBDB', marginTop: "-10px", wordWrap: 'break-word' }}>{userInfo.profile.firstName} {userInfo?.profile?.lastName || 'no data found'}</p>
                                    </div>
                                    <div>
                                        <p>Job Title</p>
                                        <p className='p-2 ' style={{ borderRadius: '8px', border: '1px solid teal', background: '#DBDBDB', marginTop: "-10px", wordWrap: 'break-word' }}>{userInfo?.jobTitle || 'no data found'}</p>
                                    </div>
                                    <div >
                                        <p>Email</p>
                                        <p className='p-2  overflow-auto ' style={{ borderRadius: '8px', border: '1px solid teal', background: '#DBDBDB', marginTop: '-10px', whiteSpace: 'nowrap', overflowWrap: 'break-word' }}>
                                            {userInfo?.profile?.email || 'no data found'}
                                        </p>

                                    </div>
                                </div>

                            </div>

                            :
                            <div className='d-flex justify-content-center align-items-center' style={{ marginTop: "70px" }}> <FadeLoader color="#36d7b7" />
                            </div>

                        }
                    </div>

                </Col>
            </Row>
        </Container>
    );
};

export default Home;
