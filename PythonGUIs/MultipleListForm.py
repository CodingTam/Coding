from PyQt5.QtWidgets import QWidget, QLabel, QLineEdit, QComboBox, QHBoxLayout, QGridLayout, QPushButton, QListWidget, QVBoxLayout, QSplitter, QTextEdit


# Database Connection
DB_CONNECTION_STRING = "DATABASE=mydb;HOSTNAME=host;PORT=50000;PROTOCOL=TCPIP;UID=myuser;PWD=mypassword;"

def init_tab1(tab):
    layout = QGridLayout()

    # Create Labels and Listboxes for the top section individually
    label1 = QLabel('label1')
    listbox1 = QListWidget()
    listbox1.addItems(['Item 1', 'Item 2', 'Item 3'])
    layout.addWidget(label1, 0, 0)
    layout.addWidget(listbox1, 1, 0)

    label2 = QLabel('label2')
    listbox2 = QListWidget()
    listbox2.addItems(['Item 1', 'Item 2', 'Item 3'])
    layout.addWidget(label2, 0, 1)
    layout.addWidget(listbox2, 1, 1)

    label3 = QLabel('label3')
    listbox3 = QListWidget()
    listbox3.addItems(['Item 1', 'Item 2', 'Item 3'])
    layout.addWidget(label3, 0, 2)
    layout.addWidget(listbox3, 1, 2)

    label4 = QLabel('label4')
    listbox4 = QListWidget()
    listbox4.addItems(['Item 1', 'Item 2', 'Item 3'])
    layout.addWidget(label4, 0, 3)
    layout.addWidget(listbox4, 1, 3)

    label5 = QLabel('label5')
    listbox5 = QListWidget()
    listbox5.addItems(['Item 1', 'Item 2', 'Item 3'])
    layout.addWidget(label5, 2, 0)
    layout.addWidget(listbox5, 3, 0)

    label6 = QLabel('label6')
    listbox6 = QListWidget()
    listbox6.addItems(['Item 1', 'Item 2', 'Item 3'])
    layout.addWidget(label6, 2, 1)
    layout.addWidget(listbox6, 3, 1)

    label7 = QLabel('label7')
    listbox7 = QListWidget()
    listbox7.addItems(['Item 1', 'Item 2', 'Item 3'])
    layout.addWidget(label7, 2, 2)
    layout.addWidget(listbox7, 3, 2)

    label8 = QLabel('label8')
    listbox8 = QListWidget()
    listbox8.addItems(['Item 1', 'Item 2', 'Item 3'])
    layout.addWidget(label8, 2, 3)
    layout.addWidget(listbox8, 3, 3)

    label9 = QLabel('label9')
    listbox9 = QListWidget()
    listbox9.addItems(['Item 1', 'Item 2', 'Item 3'])
    layout.addWidget(label9, 4, 0)
    layout.addWidget(listbox9, 5, 0)

    label10 = QLabel('label10')
    listbox10 = QListWidget()
    listbox10.addItems(['Item 1', 'Item 2', 'Item 3'])
    layout.addWidget(label10, 4, 1)
    layout.addWidget(listbox10, 5, 1)

    label11 = QLabel('label11')
    listbox11 = QListWidget()
    listbox11.addItems(['Item 1', 'Item 2', 'Item 3'])
    layout.addWidget(label11, 4, 2)
    layout.addWidget(listbox11, 5, 2)

    label12 = QLabel('label12')
    listbox12 = QListWidget()
    listbox12.addItems(['Item 1', 'Item 2', 'Item 3'])
    layout.addWidget(label12, 4, 3)
    layout.addWidget(listbox12, 5, 3)

    # Create the right side tall listbox
    right_listbox = QListWidget()
    right_listbox.addItems([f'Entry {i+1}' for i in range(10)])
    layout.addWidget(right_listbox, 0, 4, 6, 1)

    # Create the large bottom listbox
    bottom_listbox = QTextEdit()
    bottom_listbox.setPlaceholderText("Large Listbox")
    layout.addWidget(bottom_listbox, 6, 0, 1, 5)

    # Buttons Layout
    button_layout = QHBoxLayout()

    # Load Button
    load_button = QPushButton('Load')
    load_button.clicked.connect(lambda: load_dropdowns())
    button_layout.addWidget(load_button)

    # Submit Button
    submit_button = QPushButton('Submit')
    submit_button.clicked.connect(lambda: submit_form())
    button_layout.addWidget(submit_button)

    # Reset Button
    reset_button = QPushButton('Reset')
    reset_button.clicked.connect(lambda: reset_form())
    button_layout.addWidget(reset_button)

    layout.addLayout(button_layout, 7, 0, 1, 5)
    tab.setLayout(layout)

def load_dropdowns():
    # Placeholder for database interaction
    print("Load button clicked!")

def submit_form():
    print("Form Submitted!")

def reset_form():
    print("Form Reset!")
