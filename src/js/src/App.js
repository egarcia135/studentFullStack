import React, {Component} from 'react';
import Container from './Container'
import Footer from './Footer'
import './App.css';
import { getAllStudents} from './client';
import { Table, Avatar, Spin, antIcon, Modal, Empty} from 'antd'
import { errorNotification } from './Notification';
import { LoadingOutlined } from '@ant-design/icons';
import AddStudentForm from './forms/AddStudentForm';


const getIndicatorIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;

class App extends Component {

  state = {
    students: [],
    isFetching: false,
    isAddStudentModalVisable: false
  }

  componentDidMount() {
    this.fetchStudents();
  }
  openAddStudentModal = () => this.setState({isAddStudentModalVisable: true })

  closeAddStudentModal = () => this.setState({isAddStudentModalVisable: false })

  fetchStudents = () => {
    this.setState({
      isFetching: true
    })
    getAllStudents().then(res => res.json().then(students => {
      this.setState({
        students,
        isFetching: false
      })
      
    }))
    .catch(error => {
      const message = error.error.message
      const description = error.error.error
      errorNotification(message, description)
      this.setState({
        isFetching: false
      });
    });
  }

  render() {
    const commonElements = () => (
      <div>
        <Modal
        title = "Add new student"
        visible = {this.state.isAddStudentModalVisable}
        onOk={this.closeAddStudentModal}
        onCancel={this.closeAddStudentModal}
        width={1000}>
          <AddStudentForm 
          onSuccess={() => {
            this.closeAddStudentModal();
            this.fetchStudents();
          }}
          onFailure={(error) => {
            const message = error.error.message
            const description = error.error.httpStatus
            // JSON.stringify(ee)
            errorNotification(message, description)
          }}
          />
        </Modal>
        <Footer 
          numberOfStudents={students.length} 
          handleAddStudentClickEvent={this.openAddStudentModal}/>
      </div>
    )



    const {students, isFetching, isAddStudentModalVisable} = this.state
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
          style={{marginBottom: '100px'}}
            dataSource={students} 
            columns={columns} 
            pagination={false}
            rowKey='studentId'
          />
          {commonElements() }
          
      </Container>
      )
    }
   return (
    <Container>
      <Empty description ={
        <h1>No Students</h1>
      }/>
      {commonElements()}
    </Container>
   )

  }
}

export default App;
