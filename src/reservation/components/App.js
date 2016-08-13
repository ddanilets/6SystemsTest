import React from 'react';
import Modal from 'react-modal';
import Calendar from './Calendar';
import ModalContent from './ModalContent';
import Loader from 'react-loaders';
import Select from 'react-select';


const App = React.createClass({

    modalStyles: {

        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-10%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '65%'
        }
    },

    translations: {
        en: {
            monthes: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monday: "Mo",
            tuesday: "Tu",
            wednesday: "Wd",
            thursday: "Th",
            friday: "Fr",
            saturday: "St",
            sunday: "Su",
            name: "English",
            chooseLocalePlaceholder: "Language...",
            noResultsTextOnSelect: "Not found",
            user: "User",
            startTime: "Start Time",
            endTime: "End Time",
            reason: "Reason",
            comment: "Comment",
            reserve: "Reserve",
            cancel: "Cancel",
            confirm: "Confirm",
            modalHeader: "Reservation information on ",
            errors: {
                emptyFields: "Not all fields are filled",
                timeError: "Reservation time should be between 9:00 and 18:00"
            },
            tips: {
                locale: "At the right corner you can change locale",
                color: "Pink-colored days - days where someone already reserved a meeting room",
                click: "To view reservation info just click on the day",
                adding: "Adding a reservation on a day which was in past restricted"
            }
        },
        ru: {
            monthes: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            monday: "Пн",
            tuesday: "Вт",
            wednesday: "Ср",
            thursday: "Чт",
            friday: "Пт",
            saturday: "Сб",
            sunday: "Вс",
            name: "Русский",
            chooseLocalePlaceholder: "Язык...",
            noResultsTextOnSelect: "",
            user: "Пользователь",
            startTime: "Начало",
            endTime: "Конец",
            reason: "Причина",
            comment: "Коментарий",
            reserve: "Зарезервировать",
            cancel: "Отмена",
            confirm: "Принять",
            modalHeader: "Информация по резервированию на ",
            errors: {
                emptyFields: "Не все поля заполнены",
                timeError: "Время резервирования должно быть между 9:00 и 18:00"
            },
            tips: {
                locale: "В правом углу вы можете поменять язык",
                color: "Дни закрашеные розовым - дни в которых кто-то уже сделал резервацию",
                click: "Чтобы посмотреть информацию о резервации, нажмите на день",
                adding: "Добавление резервировния на день который в прошлом запрещено"
            }
        }
    },

    availableLocales: ["en", "ru"],

    createInitialCalendar(){

        let data = [];

        for (let i = 1970; i <= 2100; i++)
            data.push({
                year: i,
                monthes: [
                    {
                        month: 1,
                        days: []
                    },
                    {
                        month: 2,
                        days: []
                    },
                    {
                        month: 3,
                        days: []
                    },
                    {
                        month: 4,
                        days: []
                    },
                    {
                        month: 5,
                        days: []
                    },
                    {
                        month: 6,
                        days: []
                    },
                    {
                        month: 7,
                        days: []
                    },
                    {
                        month: 8,
                        days: []
                    },
                    {
                        month: 9,
                        days: []
                    },
                    {
                        month: 10,
                        days: []
                    },
                    {
                        month: 11,
                        days: []
                    },
                    {
                        month: 12,
                        days: []
                    }
                ]
            })
        return data
    },

    createInitialReservation(){
        let data = [];
        for (let i = 0; i < 10; i++)
            data.push({
                date: {
                    day: parseInt(Math.random() * 28) + 1,
                    month: parseInt(Math.random() * 11) + 1,
                    year: Math.random() > 0.5 ? 2016 : 2015
                },
                reservation: [{
                    user: "admin",
                    startTime: "9:00",
                    endTime: "10:00",
                    reason: "meeting",
                    comment: ""
                }]
            })
        return data;
    },


    getInitialState(){
        return {
            modalIsOpen: false,
            isFetching: false,
            locale: {value: "en", label: this.translations["en"].name},
            calendarData: this.createInitialCalendar(),
            selectedDay: {},
            selectedDayData: null,
            reservationData: this.createInitialReservation(),
            minYear: 1970,
            maxYear: 2100,
            selectedYear: parseInt(new Date().getFullYear())
        }
    },

    closeModal() {
        this.setState({modalIsOpen: false});
    },

    openModal(date){
        if (new Date(date.year, date.month - 1, date.day) >= new Date())
            this.setState({isAddingAllowed: true});
        else
            this.setState({isAddingAllowed: false});
        this.setState({
            selectedDay: date,
            modalIsOpen: true,
            selectedDayData: this.state.reservationData.filter(el=>el.date.day == date.day && el.date.month == date.month && el.date.year == date.year)[0]
        });

    },

    reserve(reservation){
        console.log(reservation);
        let reservationData = this.state.reservationData;
        let currentReservation = reservationData.filter(el=>el.date.day == reservation.date.day && el.date.month == reservation.date.month && el.date.year == reservation.date.year);
        if (currentReservation.length > 0)
            currentReservation[0].reservation.push(reservation.reservation[0]);
        else {
            reservationData.push(reservation);
            this.setState({selectedDayData: reservationData[reservationData.length-1]})
        }
        this.setState({reservationData : reservationData})
    },

    selectYear(year){
        this.setState({selectedYear: year})
    },

    changeLocale(e){
        this.setState({locale: e})
    },

    render()
    {
        return <div>
            <div className="tips">
                <ul>
                    <li>
                        {this.translations[this.state.locale.value].tips.locale}
                    </li>
                    <li>
                        {this.translations[this.state.locale.value].tips.color}
                    </li>
                    <li>
                        {this.translations[this.state.locale.value].tips.click}
                    </li>
                    <li>
                        {this.translations[this.state.locale.value].tips.adding}
                    </li>
                </ul>
            </div>
            <Select className="localeSelect" onChange={this.changeLocale} clearable={false}
                    placeholder={this.translations[this.state.locale.value].chooseLocalePlaceholder}
                    noResultsText={this.translations[this.state.locale.value].noResultsTextOnSelect}
                    options={this.availableLocales.map(el=>{return {value: el, label: this.translations[el].name}})}
                    value={this.state.locale}/>
            <Calendar reservationData={this.state.reservationData} selectedYear={this.state.selectedYear}
                      selectYear={this.selectYear}
                      callback={this.openModal}
                      minYear={this.state.minYear} maxYear={this.state.maxYear} translations={this.translations}
                      data={this.state.calendarData} locale={this.state.locale.value}/>
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                shouldCloseOnOverlayClick={false}
                style={this.modalStyles}>
                <ModalContent reserve={this.reserve} date={this.state.selectedDay} isAddingAllowed={this.state.isAddingAllowed}
                              translations={this.translations[this.state.locale.value]} date={this.state.selectedDay}
                              data={this.state.selectedDayData} closeModal={this.closeModal}/>
            </Modal>
        </div>
    }
});

export default App;