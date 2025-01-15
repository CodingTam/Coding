import sys
from PyQt5.QtWidgets import (
    QApplication, QWidget, QLabel, QLineEdit, QComboBox, QRadioButton,
    QVBoxLayout, QHBoxLayout, QPushButton, QTableWidget, QTableWidgetItem, QGridLayout, QButtonGroup,
    QCheckBox, QSlider, QSpinBox, QDateEdit, QTabWidget, QTextEdit, QFrame, QMessageBox, QListWidget, QScrollArea
)

class UserForm(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('PyQt5 User Form')
        self.setGeometry(100, 100, 1440, 900)
        self.initUI()

    def initUI(self):
        # Tab Widget
        self.tabs = QTabWidget()

        # Login Tab
        login_tab = QWidget()
        self.tabs.addTab(login_tab, "Login")
        self.init_login_tab(login_tab)

        # First Tab - Basic Form Controls
        self.tab1 = QWidget()
        self.tabs.addTab(self.tab1, "Basic Form")
        self.init_tab1(self.tab1)

        # Second Tab - Advanced Form Controls
        self.tab2 = QWidget()
        self.tabs.addTab(self.tab2, "Advanced Form")
        self.init_tab2(self.tab2)

        # Third Tab - Additional Components
        self.tab3 = QWidget()
        self.tabs.addTab(self.tab3, "Additional Components")
        self.init_tab3(self.tab3)

        # Fourth Tab - Survey Form
        self.tab4 = QWidget()
        self.tabs.addTab(self.tab4, "Student Survey")
        self.init_tab4(self.tab4)

        # Fifth Tab - 60-Column Editable Table
        self.tab5 = QWidget()
        self.tabs.addTab(self.tab5, "Data Table")
        self.init_tab5(self.tab5)

        # Disable other tabs initially
        self.tabs.setTabEnabled(1, False)
        self.tabs.setTabEnabled(2, False)
        self.tabs.setTabEnabled(3, False)
        self.tabs.setTabEnabled(4, False)
        self.tabs.setTabEnabled(5, False)

        # Main Layout
        main_layout = QVBoxLayout()
        main_layout.addWidget(self.tabs)
        self.setLayout(main_layout)

    def init_login_tab(self, tab):
        layout = QGridLayout()

        # Username
        username_label = QLabel("Username:")
        self.username_input = QLineEdit()
        layout.addWidget(username_label, 0, 0)
        layout.addWidget(self.username_input, 0, 1)

        # Password
        password_label = QLabel("Password:")
        self.password_input = QLineEdit()
        self.password_input.setEchoMode(QLineEdit.Password)
        layout.addWidget(password_label, 1, 0)
        layout.addWidget(self.password_input, 1, 1)

        # Login Button
        login_button = QPushButton("Login")
        login_button.clicked.connect(self.check_login)
        layout.addWidget(login_button, 2, 1)

        tab.setLayout(layout)

    def check_login(self):
        username = self.username_input.text()
        password = self.password_input.text()

        if username == "admin" and password == "admin":
            QMessageBox.information(self, "Success", "Login Successful!")
            self.tabs.setTabEnabled(1, True)
            self.tabs.setTabEnabled(2, True)
            self.tabs.setTabEnabled(3, True)
            self.tabs.setTabEnabled(4, True)
            self.tabs.setTabEnabled(5, True)
            self.tabs.setCurrentIndex(1)
        else:
            QMessageBox.critical(self, "Error", "Invalid Username or Password!")

    def init_tab1(self, tab):
        layout = QGridLayout()

        # Name Label and Textbox
        name_label = QLabel('Name:')
        self.name_input = QLineEdit()
        layout.addWidget(name_label, 0, 0)
        layout.addWidget(self.name_input, 0, 1)

        # Email Label and Textbox
        email_label = QLabel('Email:')
        self.email_input = QLineEdit()
        layout.addWidget(email_label, 1, 0)
        layout.addWidget(self.email_input, 1, 1)

        # Gender Radio Buttons
        gender_label = QLabel('Gender:')
        self.male_radio = QRadioButton('Male')
        self.female_radio = QRadioButton('Female')
        self.gender_group = QButtonGroup()
        self.gender_group.addButton(self.male_radio)
        self.gender_group.addButton(self.female_radio)
        self.male_radio.setChecked(True)

        gender_layout = QHBoxLayout()
        gender_layout.addWidget(self.male_radio)
        gender_layout.addWidget(self.female_radio)

        layout.addWidget(gender_label, 2, 0)
        layout.addLayout(gender_layout, 2, 1)

        # Country Dropdown (ComboBox)
        country_label = QLabel('Country:')
        self.country_combo = QComboBox()
        self.country_combo.addItems(['Canada', 'USA', 'UK', 'Australia'])
        layout.addWidget(country_label, 3, 0)
        layout.addWidget(self.country_combo, 3, 1)

        # Editable Table
        table_label = QLabel('Editable Table:')
        self.table = QTableWidget()
        self.table.setRowCount(4)
        self.table.setColumnCount(2)
        self.table.setHorizontalHeaderLabels(['Field', 'Value'])
        self.table.setItem(0, 0, QTableWidgetItem('Age'))
        self.table.setItem(1, 0, QTableWidgetItem('Address'))
        self.table.setItem(2, 0, QTableWidgetItem('Phone'))
        self.table.setItem(3, 0, QTableWidgetItem('Occupation'))
        layout.addWidget(table_label, 4, 0)
        layout.addWidget(self.table, 4, 1)

        # Buttons Layout
        button_layout = QHBoxLayout()

        # Submit Button
        submit_button = QPushButton('Submit')
        submit_button.clicked.connect(self.submit_form)
        button_layout.addWidget(submit_button)

        # Reset Button
        reset_button = QPushButton('Reset')
        reset_button.clicked.connect(self.reset_form)
        button_layout.addWidget(reset_button)

        layout.addLayout(button_layout, 5, 1)

        tab.setLayout(layout)

    def init_tab2(self, tab):
        layout = QGridLayout()

        # Checkbox
        self.checkbox = QCheckBox("I agree to the terms and conditions")
        layout.addWidget(self.checkbox, 0, 0)

        # Slider
        slider_label = QLabel("Adjust Volume:")
        self.slider = QSlider()
        self.slider.setOrientation(1)  # 1 for horizontal
        layout.addWidget(slider_label, 1, 0)
        layout.addWidget(self.slider, 1, 1)

        # SpinBox
        spinbox_label = QLabel("Select Quantity:")
        self.spinbox = QSpinBox()
        self.spinbox.setRange(1, 100)
        layout.addWidget(spinbox_label, 2, 0)
        layout.addWidget(self.spinbox, 2, 1)

        # Date Edit
        date_label = QLabel("Select Date:")
        self.date_edit = QDateEdit()
        layout.addWidget(date_label, 3, 0)
        layout.addWidget(self.date_edit, 3, 1)

        tab.setLayout(layout)

    def init_tab3(self, tab):
        layout = QVBoxLayout()

        # Text Edit
        text_edit_label = QLabel("Comments:")
        self.text_edit = QTextEdit()
        layout.addWidget(text_edit_label)
        layout.addWidget(self.text_edit)

        # Frame
        frame_label = QLabel("Sample Frame:")
        self.frame = QFrame()
        self.frame.setFrameShape(QFrame.Box)
        self.frame.setFrameShadow(QFrame.Sunken)
        layout.addWidget(frame_label)
        layout.addWidget(self.frame)

        tab.setLayout(layout)

    def init_tab4(self, tab):
        layout = QGridLayout()

        # Name and Age
        layout.addWidget(QLabel("Name:"), 0, 0)
        self.survey_name_input = QLineEdit()
        layout.addWidget(self.survey_name_input, 0, 1)

        layout.addWidget(QLabel("Age:"), 0, 2)
        self.survey_age_input = QSpinBox()
        self.survey_age_input.setRange(0, 120)
        layout.addWidget(self.survey_age_input, 0, 3)

        # Birthday
        layout.addWidget(QLabel("Birthday:"), 1, 0)
        self.survey_birthday_input = QDateEdit()
        layout.addWidget(self.survey_birthday_input, 1, 1)

        # Gender
        layout.addWidget(QLabel("Gender:"), 1, 2)
        gender_layout = QHBoxLayout()
        self.survey_male_radio = QRadioButton("Male")
        self.survey_female_radio = QRadioButton("Female")
        self.survey_undecided_radio = QRadioButton("Undecided")
        gender_layout.addWidget(self.survey_male_radio)
        gender_layout.addWidget(self.survey_female_radio)
        gender_layout.addWidget(self.survey_undecided_radio)
        layout.addLayout(gender_layout, 1, 3)

        # Phone Number
        layout.addWidget(QLabel("Phone Number:"), 2, 0)
        self.survey_phone_input = QLineEdit()
        layout.addWidget(self.survey_phone_input, 2, 1)

        # Favorite Subject (List)
        layout.addWidget(QLabel("Favorite Subject:"), 3, 0)
        self.favorite_subject_list = QListWidget()
        self.favorite_subject_list.addItems(["Math", "English", "Science", "Social Studies"])
        layout.addWidget(self.favorite_subject_list, 3, 1)

        # Sports Programs
        layout.addWidget(QLabel("Sports Programs:"), 3, 2)
        self.sports_programs_list = QListWidget()
        self.sports_programs_list.addItems(["Football", "Basketball", "Baseball", "Soccer", "Tennis", "Golf", "Hockey", "Gymnastics"])
        self.sports_programs_list.setSelectionMode(QListWidget.MultiSelection)
        layout.addWidget(self.sports_programs_list, 3, 3)

        # Personal Items (Checkboxes)
        personal_items_label = QLabel("Personal Items:")
        layout.addWidget(personal_items_label, 4, 0)
        self.cell_phone_check = QCheckBox("Cell Phone")
        self.mp3_player_check = QCheckBox("MP3 Player")
        self.car_check = QCheckBox("Car")
        self.bullwhip_check = QCheckBox("Bullwhip")
        personal_items_layout = QVBoxLayout()
        personal_items_layout.addWidget(self.cell_phone_check)
        personal_items_layout.addWidget(self.mp3_player_check)
        personal_items_layout.addWidget(self.car_check)
        personal_items_layout.addWidget(self.bullwhip_check)
        layout.addLayout(personal_items_layout, 4, 1)

        tab.setLayout(layout)

    def init_tab5(self, tab):
        layout = QVBoxLayout()

        # Scroll Area
        scroll_area = QScrollArea()
        table_widget = QWidget()
        table_layout = QVBoxLayout()

        # 60-Column Editable Table
        self.data_table = QTableWidget()
        self.data_table.setRowCount(10)
        self.data_table.setColumnCount(60)
        self.data_table.setHorizontalHeaderLabels([f"Column {i+1}" for i in range(60)])

        table_layout.addWidget(self.data_table)
        table_widget.setLayout(table_layout)
        scroll_area.setWidget(table_widget)
        scroll_area.setWidgetResizable(True)

        layout.addWidget(scroll_area)

        # Buttons for Submit and Reset
        button_layout = QHBoxLayout()
        submit_button = QPushButton("Submit")
        submit_button.clicked.connect(self.submit_modified_data)
        button_layout.addWidget(submit_button)

        reset_button = QPushButton("Reset")
        reset_button.clicked.connect(self.reset_data_table)
        button_layout.addWidget(reset_button)

        layout.addLayout(button_layout)
        tab.setLayout(layout)

    def submit_modified_data(self):
        modified_data = []
        for row in range(self.data_table.rowCount()):
            for col in range(self.data_table.columnCount()):
                item = self.data_table.item(row, col)
                if item and item.text() != "":
                    modified_data.append((row, col, item.text()))

        if modified_data:
            print("Modified Cells:")
            for row, col, value in modified_data:
                print(f"Row {row + 1}, Column {col + 1}: {value}")
        else:
            print("No modifications detected.")

    def reset_data_table(self):
        self.data_table.clearContents()

    def submit_form(self):
        # Tab 1 Inputs
        name = self.name_input.text()
        email = self.email_input.text()
        gender = 'Male' if self.male_radio.isChecked() else 'Female'
        country = self.country_combo.currentText()

        # Collect table data
        table_data = {}
        for row in range(self.table.rowCount()):
            field = self.table.item(row, 0).text()
            value = self.table.item(row, 1).text() if self.table.item(row, 1) else ''
            table_data[field] = value

        # Print all inputs
        print('Form Submitted!')
        print(f'Name: {name}')
        print(f'Email: {email}')
        print(f'Gender: {gender}')
        print(f'Country: {country}')
        print(f'Table Data: {table_data}')

    def reset_form(self):
        self.name_input.clear()
        self.email_input.clear()
        self.male_radio.setChecked(True)
        self.country_combo.setCurrentIndex(0)
        for row in range(self.table.rowCount()):
            self.table.setItem(row, 1, QTableWidgetItem(''))
        self.checkbox.setChecked(False)
        self.slider.setValue(0)
        self.spinbox.setValue(1)
        self.date_edit.setDate(self.date_edit.minimumDate())
        self.text_edit.clear()

if __name__ == '__main__':
    app = QApplication(sys.argv)
    form = UserForm()
    form.show()
    sys.exit(app.exec_())
