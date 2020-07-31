import React, { Component } from 'react';
import dateFormat from 'dateformat';
import HOC from '../../HOC';
import { toast } from 'react-toastify';
import { Button, Modal, Alert } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { recordMeal, editMeal, deleteMeal, getMeals } from '../../config/services/mealService';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            mealsList: [],
            mealName: '',
            date: new Date(),
            calories: 0,
            AddMealPopup: false,
            deleteMealPopup: false,
            editMealPopup: false,
            validationError: '',
            selectedMealId:'',
            dateFrom: new Date().setHours(0, 0, 0, 0),
            dateTo: new Date().setHours(23, 59, 59, 999),
            selectedDate: new Date().setHours(12, 30, 0, 0),
            totalCalories: 0,
        }
    }


    componentDidMount() {
        this.getMeals();
    }


    getMeals = () => {
        let { dateFrom, dateTo } = this.state;
        let paramsObj = {
            params: { dateFrom, dateTo }
        }
        getMeals(paramsObj)
            .then(res => {
                let response = res.data
                if (response.statusCode === 1) {
                    let totalCalories = 0

                    if (response.responseData.result.length) {
                        totalCalories = response.responseData.result.reduce((a, b) => a + (b['calories'] || 0), 0)
                    }


                    this.setState({
                        mealsList: response.responseData.result,
                        totalCalories,
                        loader: false
                    })
                } else if (response.statusCode === 0) {
                    this.setState({ loader: false })
                    toast.error(response.error.errorMessage)
                }
            })
    }

    openAddMealPopup = () => this.setState({ AddMealPopup: !this.state.AddMealPopup });

    closeModal = () => this.setState({
        AddMealPopup: false,
        deleteMealPopup: false,
        editMealPopup: false,
        mealName: '',
        date: new Date(),
        calories: 0,
        validationError: '',
        selectedMealId:'',
    });

    handleChange = e => {
        let { name, value } = e.target
        this.setState({ [name]: value, validationError: '' })
    }


    submitAddMeal = (e) => {
        e.preventDefault();
        let { mealName, date, calories } = this.state;
        let params = { mealName, date, calories }

        if (!mealName) {
            this.setState({ validationError: 'Enter The Meal Name' })
        } else if (!calories) {
            this.setState({ validationError: 'Enter The Calories' })
        } else if (!date) {
            this.setState({ validationError: 'Enter The Date' })
        } else {
            this.addMealApi(params)
        }
    }

    addMealApi = (params) => {
        recordMeal(params)
            .then(res => {
                let response = res.data;
                if (response.statusCode === 1) {
                    this.getMeals()
                    this.setState({ loader: false })
                    toast.success(response.responseData.message)
                    this.closeModal()
                } else if (response.statusCode === 0) {
                    this.setState({ loader: false })
                    toast.error(response.error.errorMessage)
                }
            })
    }

    selectDate = (date) => {
        this.setState({ date: new Date(date).setHours(12, 30, 0, 0) })
    }

    getMealsForDate = (date) => {
        this.setState({ dateFrom: new Date(date).setHours(0, 0, 0, 0), dateTo: new Date(date).setHours(23, 59, 59, 999), selectedDate: new Date(date).setHours(12, 30, 0, 0) }, () => {
            this.getMeals()
        })
    }

    openEditMealPopup=(meal)=>{
        let {_id, mealName, calories, date} = meal
        this.setState({selectedMealId:_id, mealName, calories, date, editMealPopup:true})
    }

    openDeleteMealPopup=(meal)=>{
        let {_id } = meal
        this.setState({selectedMealId:_id,deleteMealPopup:true})
    }
    


    submitEditMeal = (e) => {
        e.preventDefault();
        let { mealName, date, calories, selectedMealId } = this.state;
        let params = { mealRecordId:selectedMealId, mealName, date, calories }

        if (!mealName) {
            this.setState({ validationError: 'Enter The Meal Name' })
        } else if (!calories) {
            this.setState({ validationError: 'Enter The Calories' })
        } else if (!date) {
            this.setState({ validationError: 'Enter The Date' })
        } else {
            this.editMealApi(params)
        }
    }

    editMealApi = (params) => {
        editMeal(params)
            .then(res => {
                let response = res.data;
                if (response.statusCode === 1) {
                    this.getMeals()
                    this.setState({ loader: false })
                    toast.success(response.responseData.message)
                    this.closeModal()
                } else if (response.statusCode === 0) {
                    this.setState({ loader: false })
                    toast.error(response.error.errorMessage)
                }
            })
    }


    submitDeleteMeal=(e)=>{
        e.preventDefault();
        let { selectedMealId } = this.state;
        let params={ mealRecordId:selectedMealId }

        deleteMeal(params)
        .then(res => {
            let response = res.data;
            if (response.statusCode === 1) {
                this.getMeals()
                this.setState({ loader: false })
                toast.success(response.responseData.message)
                this.closeModal()
            } else if (response.statusCode === 0) {
                this.setState({ loader: false })
                toast.error(response.error.errorMessage)
            }
        })
    }

    render() {
        const {
            mealsList,
            AddMealPopup,
            validationError,
            mealName,
            date,
            calories,
            selectedDate,
            totalCalories,
            editMealPopup,
            deleteMealPopup
        } = this.state;

        if (!localStorage.getItem('accessToken')) {
            this.props.history.push('/login')
        }

        return (
            <HOC>
                <div className="body-container-wrapper">
                    <div className="body-container">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">Dashboard</li>
                        </ol>

                        <div className="users_header">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-9">
                                        <h4 className="cm_page_heading">Meals Recorded</h4>
                                    </div>

                                    <div className="col-md-3 text-right">
                                        <button className="btn btn-primary btn-block" onClick={this.openAddMealPopup}>Add New Meal</button>
                                    </div>
                                    
                                    <div className="col-md-3">
                                        <h4 className={totalCalories<2000?"cm_green":"cm_red"} >Calories Taken: {totalCalories}</h4>
                                    </div>

                                    <div className="col-md-3">
                                        <label>Select Date</label>
                                        <DatePicker
                                            className="form-control text-center"
                                            onChange={this.getMealsForDate}
                                            showYearDropdown
                                            placeholderText="Select Date....."
                                            maxDate={new Date()}
                                            dateFormat="MMMM d, yyyy"
                                            selected={selectedDate}
                                        />
                                    </div>
                                  
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col" className="filter_text">Meal Name</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Calories</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>


                                <tbody>
                                    {
                                        mealsList.map((meal, i) => {
                                            return (
                                                <tr key={meal._id}>
                                                    <td>{(i + 1)}</td>
                                                    <td><span className={`cm_table_three_dots ${totalCalories<2000?'cm_green_text':'cm_red_text'}`}>{meal.mealName}</span></td>
                                                    <td><span className="cm_table_three_dots">{dateFormat(meal.date, "d mmmm yyyy")}</span></td>
                                                    <td><span className="cm_table_three_dots">{meal.calories}</span></td>
                                                    <td className="cm_no_wrap">
                                                        <button className="btn btn-dark btn-sm" onClick={() => this.openEditMealPopup(meal)} >Edit</button>
                                                        &nbsp;&nbsp;
                                                        <button className="btn btn-danger btn-sm" onClick={() => this.openDeleteMealPopup(meal)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })

                                    }
                                </tbody>
                            </table>

                            {!mealsList.length ? <h3 className="empty_error">Sorry, we couldn't find any meal for selected date, Try Adding one!</h3> : null}
                        </div>
                    </div>
                </div>

                <Modal show={AddMealPopup} onHide={this.closeModal} centered>
                    <Modal.Header closeButton> <Modal.Title> Record Meal </Modal.Title> </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Meal Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="mealName"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Calories</label>
                            <input
                                type="number"
                                className="form-control"
                                name="calories"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <DatePicker
                                className="form-control text-center"
                                onChange={this.selectDate}
                                showYearDropdown
                                placeholderText="Select Date....."
                                selected={date}
                                maxDate={new Date()}
                                dateFormat="MMMM d, yyyy"
                            />
                        </div>
                    </Modal.Body>
                    {validationError && <Alert variant="danger"> {validationError} </Alert>}
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.closeModal}>Close</Button>
                        <Button variant="success" onClick={this.submitAddMeal}>Submit</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={editMealPopup} onHide={this.closeModal} centered>
                    <Modal.Header closeButton> <Modal.Title> Update Meal </Modal.Title> </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Meal Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="mealName"
                                onChange={this.handleChange}
                                value={mealName}
                            />
                        </div>
                        <div className="form-group">
                            <label>Calories</label>
                            <input
                                type="number"
                                className="form-control"
                                name="calories"
                                onChange={this.handleChange}
                                value={calories}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <DatePicker
                                className="form-control text-center"
                                onChange={this.selectDate}
                                showYearDropdown
                                placeholderText="Select Date....."
                                selected={date}
                                maxDate={new Date()}
                                dateFormat="MMMM d, yyyy"
                            />
                        </div>
                    </Modal.Body>
                    {validationError && <Alert variant="danger"> {validationError} </Alert>}
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.closeModal}>Close</Button>
                        <Button variant="success" onClick={this.submitEditMeal}>Submit</Button>
                    </Modal.Footer>
                </Modal>


                <Modal show={deleteMealPopup} onHide={this.closeModal} centered>
                    <Modal.Header closeButton> <Modal.Title>Are you sure to delete this meal record? </Modal.Title> </Modal.Header>
                    <Modal.Body>
                    {validationError && <Alert variant="danger"> {validationError} </Alert>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.closeModal}>Close</Button>
                        <Button variant="success" onClick={this.submitDeleteMeal}>Submit</Button>
                    </Modal.Footer>
                </Modal>

            </HOC>
        )
    }
}



export default Dashboard;