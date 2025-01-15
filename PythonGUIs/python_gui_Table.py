from PyQt5.QtWidgets import QWidget, QLabel, QLineEdit, QComboBox, QHBoxLayout, QGridLayout, QPushButton, QListWidget, QVBoxLayout, QSplitter, QTableWidget, QTableWidgetItem
import ibm_db

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

    # Create the right side tall listbox with label
    right_label = QLabel('Right Listbox')
    right_listbox = QListWidget()
    right_listbox.addItems([f'Entry {i+1}' for i in range(10)])
    layout.addWidget(right_label, 0, 4)
    layout.addWidget(right_listbox, 1, 4, 6, 1)

    # Create the large bottom non-editable table with scrollbars
    table_label = QLabel('Data Table')
    data_table = QTableWidget()
    data_table.setColumnCount(3)  # Set column count
    data_table.setHorizontalHeaderLabels(['Column 1', 'Column 2', 'Column 3'])
    data_table.setRowCount(0)
    data_table.setEditTriggers(QTableWidget.NoEditTriggers)  # Make table non-editable
    data_table.setVerticalScrollBarPolicy(Qt.ScrollBarAlwaysOn)
    data_table.setHorizontalScrollBarPolicy(Qt.ScrollBarAlwaysOn)

    layout.addWidget(table_label, 6, 0, 1, 5)
    layout.addWidget(data_table, 7, 0, 1, 5)

    # Load data into the table from DB2 query
    load_data_button = QPushButton('Load Data')
    load_data_button.clicked.connect(lambda: load_data_from_db(data_table))
    layout.addWidget(load_data_button, 8, 0, 1, 5)

    # Buttons Layout
    button_layout = QHBoxLayout()

    # Submit Button
    submit_button = QPushButton('Submit')
    submit_button.clicked.connect(lambda: submit_form())
    button_layout.addWidget(submit_button)

    # Reset Button
    reset_button = QPushButton('Reset')
    reset_button.clicked.connect(lambda: reset_form())
    button_layout.addWidget(reset_button)

    layout.addLayout(button_layout, 9, 0, 1, 5)
    tab.setLayout(layout)

def load_data_from_db(table):
    try:
        conn = ibm_db.connect(DB_CONNECTION_STRING, "", "")
        sql = "SELECT col1, col2, col3 FROM my_table"
        stmt = ibm_db.exec_immediate(conn, sql)
        table.setRowCount(0)  # Clear existing rows
        row = 0
        result = ibm_db.fetch_assoc(stmt)
        while result:
            table.insertRow(row)
            table.setItem(row, 0, QTableWidgetItem(result['COL1']))
            table.setItem(row, 1, QTableWidgetItem(result['COL2']))
            table.setItem(row, 2, QTableWidgetItem(result['COL3']))
            result = ibm_db.fetch_assoc(stmt)
            row += 1
        ibm_db.close(conn)
    except Exception as e:
        print(f"Error loading data: {e}")

def submit_form():
    print("Form Submitted!")

def reset_form():
    print("Form Reset!")
