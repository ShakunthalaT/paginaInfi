import "./App.css";
import InfiniteScroll from 'react-infinite-scroll-component'
import {useState} from 'react'

const App =()=>{
    const [dataSource,setDataSource] = useState(Array.from({length:1000}));
    const [hashMore,setHasMore] = useState(true)
    const fetchApiData = () =>{
        //ApiCalls
        if(dataSource.length < 100){
        setTimeout(() => {
            setDataSource(dataSource.concat(Array.from({ length: 20 })))
        }, 1000);
        }
        else{
            setHasMore(false)
        }
    }

    return(
    <>
       <InfiniteScroll dataLength={dataSource.length} loader={<p>Loading...</p>} next={fetchApiData} hasMore={hashMore} height={500} endMessage={<p>No more Items</p>}>
           {dataSource.map((item,index)=>{
               return <div>
                   This is {index + 1} InfiniteScroll
               </div>
           })}
       </InfiniteScroll>
    </>
    )}


export default App;
