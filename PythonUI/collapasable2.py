import sys
from PyQt5.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout,
                             QHBoxLayout, QPushButton, QTableWidget, QGroupBox,
                             QGridLayout, QSizePolicy, QListWidget, QLineEdit,
                             QAbstractItemView, QLabel)
from PyQt5.QtCore import Qt, pyqtSignal


class SearchableListBox(QWidget):
    def __init__(self, title=""):
        super().__init__()

        # Create layout
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)

        # Add label if title is provided
        if title:
            label = QLabel(title)
            layout.addWidget(label)

        # Create search box
        self.search_box = QLineEdit()
        self.search_box.setPlaceholderText("Search...")
        self.search_box.textChanged.connect(self.filter_items)
        layout.addWidget(self.search_box)

        # Create list widget
        self.list_widget = QListWidget()
        self.list_widget.setSelectionMode(QAbstractItemView.MultiSelection)
        # Set fixed height to show 5 items
        self.list_widget.setMinimumHeight(100)
        layout.addWidget(self.list_widget)

        # Store all items for filtering
        self.all_items = []

    def addItems(self, items):
        self.all_items = items
        self.list_widget.addItems(items)

    def filter_items(self, text):
        # Show all items if search text is empty
        if not text:
            for i in range(self.list_widget.count()):
                self.list_widget.item(i).setHidden(False)
            return

        # Filter items based on search text
        for i in range(self.list_widget.count()):
            item = self.list_widget.item(i)
            item.setHidden(not text.lower() in item.text().lower())

    def get_selected_items(self):
        return [item.text() for item in self.list_widget.selectedItems()]

    def clear_selection(self):
        self.list_widget.clearSelection()
        self.search_box.clear()


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Search and Data Application")
        self.setMinimumSize(1200, 800)

        # Create main widget and layout
        main_widget = QWidget()
        self.setCentralWidget(main_widget)
        main_layout = QVBoxLayout(main_widget)

        # Create collapsible groups
        self.search_group = CollapsibleGroup("Search Options")
        self.table_group = CollapsibleGroup("Data Table")

        # Setup search section
        search_layout = QGridLayout()

        # Create 8 searchable listboxes (4x2 grid)
        self.list_boxes = []
        list_titles = [
            "List 1", "List 2", "List 3", "List 4",
            "List 5", "List 6", "List 7", "List 8"
        ]

        for i in range(8):
            list_box = SearchableListBox(title=list_titles[i])
            list_box.addItems([f"Item {x}" for x in range(1, 11)])
            row = i // 4
            col = i % 4
            search_layout.addWidget(list_box, row, col)
            self.list_boxes.append(list_box)

        # Create 9th listbox with higher height
        right_list = SearchableListBox(title="List 9")
        right_list.addItems([f"Item {x}" for x in range(1, 11)])
        right_list.setMinimumHeight(250)  # Make it taller
        right_list.list_widget.setMinimumHeight(200)  # Adjust internal list height
        search_layout.addWidget(right_list, 0, 4, 2, 1)
        self.list_boxes.append(right_list)

        self.search_group.setLayout(search_layout)

        # Setup table section
        table_layout = QVBoxLayout()
        self.table = QTableWidget(10, 5)
        self.table.setHorizontalHeaderLabels(['Col 1', 'Col 2', 'Col 3', 'Col 4', 'Col 5'])
        table_layout.addWidget(self.table)
        self.table_group.setLayout(table_layout)

        # Create buttons
        button_layout = QHBoxLayout()
        buttons = {
            'Load': self.load_data,
            'Submit': self.submit_data,
            'Export': self.export_data,
            'Reset': self.reset_data
        }

        for text, func in buttons.items():
            btn = QPushButton(text)
            btn.clicked.connect(func)
            button_layout.addWidget(btn)

        # Add all components to main layout
        main_layout.addWidget(self.search_group)
        main_layout.addWidget(self.table_group)
        main_layout.addLayout(button_layout)

        # Connect collapse signals
        self.search_group.collapsed.connect(self.on_group_collapsed)
        self.table_group.collapsed.connect(self.on_group_collapsed)

    def on_group_collapsed(self):
        sender = self.sender()
        if sender == self.search_group:
            if self.search_group.is_collapsed:
                self.table_group.expand_full()
            else:
                self.table_group.restore_size()

    def load_data(self):
        # Example of getting selected items from listboxes
        for i, list_box in enumerate(self.list_boxes):
            selected = list_box.get_selected_items()
            print(f"ListBox {i + 1} selections:", selected)

    def submit_data(self):
        # Implement submit functionality
        pass

    def export_data(self):
        # Implement export functionality
        pass

    def reset_data(self):
        # Clear all selections and search text
        for list_box in self.list_boxes:
            list_box.clear_selection()
        self.table.clearContents()


class CollapsibleGroup(QGroupBox):
    collapsed = pyqtSignal()

    def __init__(self, title):
        super().__init__(title)
        self.is_collapsed = False
        self.original_height = None
        self.setCheckable(True)
        self.toggled.connect(self.on_collapsed)

        # Add margin to ensure title is always visible
        self.setStyleSheet("""
            QGroupBox {
                margin-top: 20px;
            }
            QGroupBox::title {
                subcontrol-origin: margin;
                subcontrol-position: top left;
                padding: 5px;
                background-color: palette(window);
            }
        """)

    def on_collapsed(self, checked):
        self.is_collapsed = not checked
        if self.is_collapsed:
            if self.original_height is None:
                self.original_height = self.height()
            self.setMaximumHeight(45)  # Increased from 20 to 35 to ensure visibility
        else:
            self.setMaximumHeight(16777215)  # Qt's QWIDGETSIZE_MAX
        self.collapsed.emit()

    def expand_full(self):
        self.setMaximumHeight(16777215)

    def restore_size(self):
        if not self.is_collapsed:
            self.setMaximumHeight(16777215)


if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())