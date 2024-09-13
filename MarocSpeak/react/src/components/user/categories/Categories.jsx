import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axiosClient from '../../../axios-client';
import { Box, Button, Input, Menu, MenuGroup, Text, Textarea, useDisclosure, useToast } from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

export default function Categories() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const toast = useToast();

    //search
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
      axiosClient.get(`/prof/search/categories?query=${searchQuery}`)
      .then(response => {
               setCategories(response.data);
           })
           .catch(error => {
               console.error('Error searching categories:', error);
           });
    }
        

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    const getCategories = (page = 1) => {
      setLoading(true);
      axiosClient.get(`/profcategory?page=${page}`)
        .then(({ data }) => {
          setLoading(false);
          setCategories(data.data);
          console.log(data.current_page)
          console.log(data.last_page)
          setCurrentPage(data.current_page);
          setTotalPages(data.last_page);
        })
        .catch(() => {
          setLoading(false);
        });
    };
    
      useEffect(() => {
        getCategories();
      }, [])


      const DeleteCat=(c)=>{
        axiosClient.delete(`/profcategory/${c}`)
        .then(() => {
          toast({
            title : 'Category deleted',
            status : 'success',
            duration : 4000,
            isClosable : true
          });
          navigate('/');
        })
      }

      const [category, setCategory] = useState({
        id : null,
        cat_name : '',
        cat_description : '',
      })

      const Sub=(e)=>{
        e.preventDefault();
    
        const formData = new FormData();
          formData.append('cat_name', category.cat_name);
          formData.append('cat_description', category.cat_description);
    
          axiosClient.post('/profcategories', formData)
        .then(() => {
            toast({
                title: 'Category created',
                status: 'success',
                duration: 4000,
                isClosable: true,
              });
            navigate('/');
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
              setErrors(response.data.errors);
            }
          });
        }


        const toggleMenu = () => {
          setIsOpen(!isOpen);
        };

    return (
      <div>
        <div>
            <input className='mb-3'
                type="text" 
                placeholder="Search categories..." 
                value={searchQuery} 
                onChange={handleSearchInputChange} 
            />
            <button onClick={handleSearch} id='search_cat'>Search</button>
        </div>

<div id='div_add_new'><button onClick={toggleMenu} id='add_new'>Add New</button></div>

            <div className='d-flex justify-content-end'>
            <div className={`menu-content ${isOpen ? 'open' : ''}`}>
                {isOpen &&
                <Menu>
                    <MenuGroup>
                 
                    <Box p={4} mt={9}>
                        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                        <Box p="6">
                        <Box d="flex" alignItems="baseline">
                            <Text fontSize="xl" fontWeight="semibold" mr="2">
                            Create a new category
                            </Text>
                        </Box>
                        <form onSubmit={Sub}>
                            <Box mt="4">
                            <Input
                                id="cat_name"
                                type="text"
                              onChange={(e) =>
                                setCategory({ ...category, cat_name: e.target.value })
                              }
                                placeholder="Enter the category name"
                            />
                            </Box>
                            <Box mt="4">
                            <Textarea
                              onChange={(e) =>
                                setCategory({
                                  ...category,
                                  cat_description: e.target.value,
                                })
                              }
                                placeholder="Enter the category description"
                                resize="vertical"
                                size="sm"
                                height="80px"
                            />
                            </Box>
                            <Box mt="4">
                            <Button type="submit" colorScheme="blue">
                                Submit
                            </Button>
                            </Box>
                        </form>
                        </Box>
                        </Box>
                        </Box>
                  </MenuGroup>
            
                  </Menu>
}
      </div>
    </div>
 
        
  
    <div id='table_cats_div' style={{ maxHeight: '500px', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
    <style jsx>{`
        #table_cats_div::-webkit-scrollbar {
            width: 12px;
        }
        
        #table_cats_div::-webkit-scrollbar-thumb {
            background-color: cyan;
            border-radius: 10px;
        }
    `}</style>
    <table id='table_cats' className="table table-hover">
        <colgroup>
            <col style={{ width: '10%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '15%' }} />
        </colgroup>
        <thead>
            <tr>
                <th>#</th>
                <th>name category</th>
                <th>description</th>
                <th>creation date</th>
                <th>Order</th>
            </tr>
        </thead>
        <tbody>
            {categories.map((row, key) => (
                <tr key={row.key}>
                    <td>{row.id}</td>
                    <td>{row.cat_name}</td>
                    <td id='description'>{row.cat_description}</td>
                    <td>{row.created_at}</td>
                    <td>
                        <Link to={`/addcourse/${row.id}`}>
                            <button className='btn btn-outline-info d-flex align-items-center mb-2'>
                                Course&nbsp;
                                <AddIcon />
                            </button>
                        </Link>
                        <button onClick={() => {
                            const confirmed = window.confirm('Are you sure you want to delete this category ?');
                            if (confirmed) {
                                DeleteCat(row.id);
                            }
                        }} className='btn btn-outline-danger d-flex align-items-center'>
                            Delete&nbsp;
                            <DeleteIcon />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>


        </div>
    )

}
