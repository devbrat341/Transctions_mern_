import { useEffect, useState } from 'preact/hooks'
import axios from 'axios'
import statics from './statics';
import barChart from './barChart';

export function Transact() {
  const [transction, setTransction] = useState([]);
  const [page, setPage] = useState(1);
  const [month, setMonth] = useState("3");
  const [search, setSearch] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(10)  
  
  useEffect(() => {
    axios.get(`http://localhost:3000/transactions/${month}`).then(response => {
      setTransction(response.data);
    });
  }, [month]);
  
  console.log(transction)

  


  return (
    <>
    <div className='Tab'>
    <table>
        <tr>
            <th>id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Sold</th>
            <th>image</th>
        </tr>
          {transction.map((item, i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>{item.sold === false ? 'False' 
                        : item.sold === true
                        ? 'True' 
                        : item.sold}</td>
              <td>{<img
              src={item.image}
              width={60}
              alt='Player'
            />}</td>
            </tr>
          ))}
      </table>
      </div>
      <nav>
        <ul className='pagination'>
                <a href='#' className='page-link' onClick={prePage}>
                    Prev
                </a>
          <button className='page-item'> {page}</button>
            <a href='#' className='page-link'
            onClick={nextPage}>Next</a>
        </ul>
      </nav>
      <>
      <statics  data= {transction} month={month}/>
      </>
      <>
        <barChart  data= {transction} month={month}/>
      </>
      
      </> 
  )


}
