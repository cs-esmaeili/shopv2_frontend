import { v4 as uuidv4 } from 'uuid';
const useGenerator = () => {

    const generateID = () => {
        return uuidv4();
    }
    return [generateID];
}
export default useGenerator;
