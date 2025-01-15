
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

        # Buttons Layout
        button_layout = QHBoxLayout()

        # Submit Button
        submit_button = QPushButton('Submit')
        button_layout.addWidget(submit_button)

        # Reset Button
        reset_button = QPushButton('Reset')
        button_layout.addWidget(reset_button)

        layout.addLayout(button_layout, 3, 1)

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

        # Buttons Layout
        button_layout = QHBoxLayout()

        # Submit Button
        submit_button = QPushButton('Submit')
        button_layout.addWidget(submit_button)

        # Reset Button
        reset_button = QPushButton('Reset')
        button_layout.addWidget(reset_button)

        layout.addLayout(button_layout, 4, 1)

        tab.setLayout(layout)

if __name__ == '__main__':
    app = QApplication(sys.argv)
    form = UserForm()
    form.show()
    sys.exit(app.exec_())
