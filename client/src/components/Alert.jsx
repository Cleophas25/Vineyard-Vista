import { useAppContext } from '../context/appContext'

const Alert = () => {
   const { alertType, alertText } = useAppContext() 
   return <div className={`absolute top-5 right-auto py-2 px-3 mb-4 border-transparent rounded-md text-center ${alertType}`}>
      {alertText}
   </div>
}

export default Alert