from PyQt5.QtWidgets import QWidget, QLabel, QLineEdit, QComboBox, QHBoxLayout, QGridLayout, QPushButton, QListWidget, QVBoxLayout, QSplitter, QTextEdit, QListWidgetItem
from PyQt5.QtCore import Qt

# Database Connection
DB_CONNECTION_STRING = "DATABASE=mydb;HOSTNAME=host;PORT=50000;PROTOCOL=TCPIP;UID=myuser;PWD=mypassword;"

def init_tab1(tab):
    layout = QGridLayout()

    def create_searchable_listbox(label_text, row, col):
        label = QLabel(label_text)
        search_input = QLineEdit()
        search_input.setPlaceholderText("Search...")

        listbox = QListWidget()
        listbox.setSelectionMode(QListWidget.MultiSelection)
        listbox.addItems(['Item 1', 'Item 2', 'Item 3'])

        search_input.textChanged.connect(lambda: filter_listbox(search_input, listbox))

        layout.addWidget(label, row, col)
        layout.addWidget(search_input, row + 1, col)
        layout.addWidget(listbox, row + 2, col)

        return listbox

    def filter_listbox(search_input, listbox):
        search_text = search_input.text().lower()
        for index in range(listbox.count()):
            item = listbox.item(index)
            item.setHidden(search_text not in item.text().lower())

    # Add searchable listboxes
    listbox1 = create_searchable_listbox('label1', 0, 0)
    listbox2 = create_searchable_listbox('label2', 0, 1)
    listbox3 = create_searchable_listbox('label3', 0, 2)
    listbox4 = create_searchable_listbox('label4', 0, 3)
    listbox5 = create_searchable_listbox('label5', 3, 0)
    listbox6 = create_searchable_listbox('label6', 3, 1)
    listbox7 = create_searchable_listbox('label7', 3, 2)
    listbox8 = create_searchable_listbox('label8', 3, 3)
    listbox9 = create_searchable_listbox('label9', 6, 0)
    listbox10 = create_searchable_listbox('label10', 6, 1)
    listbox11 = create_searchable_listbox('label11', 6, 2)
    listbox12 = create_searchable_listbox('label12', 6, 3)

    # Create the right side tall listbox with label
    right_label = QLabel('Right Listbox')
    right_search_input = QLineEdit()
    right_search_input.setPlaceholderText("Search...")
    right_listbox = QListWidget()
    right_listbox.setSelectionMode(QListWidget.MultiSelection)
    right_listbox.addItems([f'Entry {i+1}' for i in range(10)])

    right_search_input.textChanged.connect(lambda: filter_listbox(right_search_input, right_listbox))

    layout.addWidget(right_label, 0, 4)
    layout.addWidget(right_search_input, 1, 4)
    layout.addWidget(right_listbox, 2, 4, 4, 1)

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
    submit_button.clicked.connect(lambda: submit_form([listbox1, listbox2, listbox3, listbox4, listbox5, listbox6, listbox7, listbox8, listbox9, listbox10, listbox11, listbox12, right_listbox]))
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

def submit_form(listboxes):
    selected_items = {}
    for idx, listbox in enumerate(listboxes):
        selected_items[f"Listbox {idx + 1}"] = [item.text() for item in listbox.selectedItems()]
    print("Selected items:", selected_items)

def reset_form():
    print("Form Reset!")
