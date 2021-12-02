import useMyProfile from '../../hooks/useMyProfile'
import Spacing from '../../components/spacing'


function EditProfile() {
      const { error, loading, data: myProfileResult } = useMyProfile();
    return (
    <>
    <Spacing />
    <h4 className='bg-black'>Edit Profile</h4>
    </>
    )


}

export default EditProfile;
