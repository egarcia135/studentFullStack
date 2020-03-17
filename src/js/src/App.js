import React, {Component} from 'react';
import Container from './Container'
import './App.css';
import { getAllStudents} from './client';
import { Table, Avatar, Spin, antIcon } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';


const getIndicatorIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;

class App extends Component {

  state = {
    students: [],
    isFetching: false
  }

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    this.setState({
      isFetching: true
    })
    getAllStudents().then(res => res.json().then(students => {
      this.setState({
        students,
        isFetching: false
      })
      
    }));
  }

  render() {


    const {students, isFetching} = this.state
    if(isFetching) {
      return(
        <Container>
          <Spin indicator={getIndicatorIcon}/>
        </Container>
      )
    }

    if(students && students.length) {

      const columns = [

        {
          title: '',
          key: 'avatar',
          render: (text, student) => (
            <Avatar size='large'>
              {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
            </Avatar>
          )
        },
        {
          title: 'StudentId',
          dataIndex: 'studentId',
          key: 'studentId'
        },
        {
          title: 'FirstName',
          dataIndex: 'firstName',
          key: 'firstName'
        },
        {
          title: 'LasttName',
          dataIndex: 'lastName',
          key: 'lastName'
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender'
        }
      ];
      return (
        <Container>
          <Table 
            dataSource={students} 
            columns={columns} 
            pagination={false}
            rowKey='studentId'
          />
      </Container>
      )



    }
    return <h2>No students</h2>

  }
}

export default App;
