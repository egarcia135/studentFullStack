import React, {Component} from 'react';
import './App.css';
import { getAllStudents} from './client';
import { Table } from 'antd'

class App extends Component {

  state = {
    students: []
  }

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    getAllStudents().then(res => res.json().then(students => {
      this.setState({
        students
      })
      
    }));
  }

  render() {

    const {students} = this.state

    if(students && students.length) {

      const columns = [
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
      <Table 
        dataSource={students} 
        columns={columns} 
        rowKey='studentId'
      />
      )



    }
    return <h2>No students</h2>

  }
}

export default App;
