import axios from '@/lib/axios'
import Swal from 'sweetalert2'
import useSWR from 'swr'

export const membership = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const { data: membershipInfo, error, mutate } = useSWR('/api/getMemberInfo', () =>
    axios.get('/api/getMemberInfo')
    .then(res => res.data)
    .catch(error => {
      if (error.response.status !== 409) throw error;
    })
  )

  const cancelOrRestoreMemberShip = async({setLoading, scheduledMemberShipType}) => {
    await csrf()
    axios.post('/api/cancel-restore-membership', {scheduledMemberShipType}).then(res => {
        mutate();
        setLoading(false);
        Swal.fire({
            icon: res.data.is_success ? 'success' : 'error',
            text: res.data.error_message,
        })
    });
  }

  const downgradeMemberShip = async({setLoading, id}) => {
    await csrf()
    axios.post('/api/downgrade-membership', {id}).then(res => {
      mutate();
      setLoading(false);
      Swal.fire({
        icon: res.data.is_success ? 'success' : 'error',
        text: res.data.error_message,
      })      
    });
  }

  return {
    membershipInfo,
    cancelOrRestoreMemberShip,
    downgradeMemberShip
  }
}