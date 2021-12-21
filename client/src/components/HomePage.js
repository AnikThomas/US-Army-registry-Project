import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./context";
import Table from "./Table";
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`
function HomePage() {
/* 
    - Columns is a simple array right now, but it will contain some logic later on. It is recommended by react-table to memoize the columns data
    - Here in this example, we have grouped our columns into two headers. react-table is flexible enough to create grouped table headers
  */
    const columns = [{
       Header: "Avatar",
       accessor: "avatar"
    },
    {
       Header:"Name",
       accessor: "name"
    },
    {
        Header: "Sex",
        accessor: "sex"
    },
    {
        Header: "Rank",
        accessor: "rank"
    },
    {
        Header: "Start Date",
        accessor: "startDate"
    },
    {
        Header: "Phone",
        accessor: "phone"
    },
    {
        Header: "Email",
        accessor: "email"
    },
    {
        Header: "Superior",
        accessor: "supervisor"
    },
    {
        Header: "Edit",
        accessor: '[editButton]',
        Cell: (cellObj) => {
            console.log(cellObj);
            const linkPlace = "/personnelDetails/" + cellObj.data[cellObj.row.index]._id;
            return (<Link to={linkPlace}>
                        <Button className="mt-2" color="primary" size="sm">Edit</Button>
                    </Link>)
        }
        
    },
    {
        Header: "Delete",
        id: 'delete',
        Cell: (cellObj) => {
            
            const delete_Uri = "personnel/" + cellObj.data[cellObj.row.index]._id;
            return (
                <Button onClick={() => {
                        const requestOptions = {
                            method: 'DELETE',
                            headers: { 
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': 'http://localhost:3000'
                            },
                        };
                       
                        fetch('http://localhost:8000/' + delete_Uri, requestOptions)
                        .then((res) => {
                            console.log(res)
                            return res.json()
                        })
                        .catch((err) => console.log(err));
                    }
                
                 } className="mt-2" color="primary" size="sm">Delete</Button>
            )
        }
    }
    
        
];

    const { personnels } = useContext(AppContext);
    const [searchBoxWords, setSearchBoxWords] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = event => {
        setSearchBoxWords(event.target.value);
    };

    useEffect(() => {
        console.log(personnels)
        const results = personnels.filter(personnel => personnel.name.toLowerCase().startsWith(searchBoxWords.toLowerCase()));
        setSearchResults(results);
    },[personnels, searchBoxWords]);

  const data = React.useMemo(() => {
      if(searchResults?.length > 0) {
        return searchResults
      } else {
          return []
      }    

  }, [searchResults])

  return (
    <div>
        <div className="search m-2">
            <input type="text" placeholder="Search" value={searchBoxWords} onChange={handleChange} />
        </div>
        <Link to="/personnelDetails">
             <Button className="mt-2 ml-2" color="primary" size="sm">New Soldier</Button>
         </Link>

         <Button onClick={() => setSearchBoxWords("")} className="mt-2 ml-2" color="primary" size="sm">Reset</Button>
        
        <Styles>
            <Table columns={columns} data={data} />
        </Styles>
    </div>
  ) 
  
}

export default HomePage;