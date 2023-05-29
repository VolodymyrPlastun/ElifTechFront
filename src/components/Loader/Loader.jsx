import { LoaderWrapper } from "./Loader.styled";
import {BounceLoader} from 'react-spinners';

const Loader = () => {
  return (
    <LoaderWrapper>
                 <BounceLoader
                color={"aqua"}
                loading={true}
                size={60}
                aria-label="Loading Spinner"
            />
    </LoaderWrapper>
  )
}

export default Loader;
