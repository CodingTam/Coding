import sys
from PyQt5.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout,
                             QHBoxLayout, QComboBox, QPushButton, QLabel, QTableWidget,
                             QTableWidgetItem, QGridLayout, QSizePolicy)
from PyQt5.QtCore import Qt
import pyqtgraph as pg
from datetime import datetime, timedelta
import random


class Dashboard(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Application Monitoring Dashboard")
        self.setGeometry(100, 100, 1600, 900)

        # Main widget and layout
        main_widget = QWidget()
        self.setCentralWidget(main_widget)
        layout = QVBoxLayout(main_widget)

        # Top controls
        controls_layout = QHBoxLayout()

        # Application dropdown
        self.app_dropdown = QComboBox()
        self.app_dropdown.addItems(["All Applications", "App 1", "App 2", "App 3"])
        self.app_dropdown.currentTextChanged.connect(self.refresh_data)

        # Refresh button
        refresh_btn = QPushButton("Refresh")
        refresh_btn.clicked.connect(self.refresh_data)
        refresh_btn.setStyleSheet("""
            QPushButton {
                background-color: #4CAF50;
                color: white;
                border: none;
                padding: 5px 15px;
                border-radius: 4px;
            }
            QPushButton:hover {
                background-color: #45a049;
            }
        """)

        controls_layout.addWidget(QLabel("Select Application:"))
        controls_layout.addWidget(self.app_dropdown)
        controls_layout.addWidget(refresh_btn)
        controls_layout.addStretch()

        layout.addLayout(controls_layout)

        # KPI Metrics
        kpi_layout = QHBoxLayout()
        self.kpi_widgets = []
        kpi_titles = ["Total Users", "Active Sessions", "Error Rate",
                      "Response Time", "Success Rate"]

        for title in kpi_titles:
            kpi_widget = self.create_kpi_widget(title)
            kpi_layout.addWidget(kpi_widget)
            self.kpi_widgets.append(kpi_widget)

        layout.addLayout(kpi_layout)

        # Graphs
        graphs_layout = QHBoxLayout()

        # Create graph widgets with proper styling
        self.user_graph = self.create_graph("User Logins Over Time")
        self.issues_graph = self.create_graph("Issues Over Time")
        self.records_graph = self.create_graph("Records Over Time")

        for graph in [self.user_graph, self.issues_graph, self.records_graph]:
            graphs_layout.addWidget(graph)

        layout.addLayout(graphs_layout)

        # Tables
        tables_layout = QHBoxLayout()

        # Error Log Table
        self.error_table = self.create_table(
            ["Timestamp", "Error Type", "Message", "Application"]
        )

        # Access Information Table
        self.access_table = self.create_table(
            ["Timestamp", "User", "Action", "Application"]
        )

        tables_layout.addWidget(self.error_table)
        tables_layout.addWidget(self.access_table)
        layout.addLayout(tables_layout)

        # Initial data load
        self.refresh_data()

    def create_kpi_widget(self, title):
        widget = QWidget()
        widget.setStyleSheet("""
            QWidget {
                background-color: #f0f0f0;
                border-radius: 10px;
                padding: 10px;
                margin: 5px;
            }
            QLabel {
                background-color: transparent;
            }
        """)
        layout = QVBoxLayout(widget)

        title_label = QLabel(title)
        title_label.setAlignment(Qt.AlignCenter)
        title_label.setStyleSheet("font-weight: bold; color: #2c3e50;")

        value_label = QLabel("0")
        value_label.setAlignment(Qt.AlignCenter)
        value_label.setStyleSheet("font-size: 24px; font-weight: bold; color: #27ae60;")
        value_label.setObjectName("value_label")

        layout.addWidget(title_label)
        layout.addWidget(value_label)

        return widget

    def create_graph(self, title):
        plot_widget = pg.PlotWidget()
        plot_widget.setBackground('w')
        plot_widget.setTitle(title, color='k', size='12pt')
        plot_widget.showGrid(x=True, y=True)

        # Style the axis
        plot_widget.getAxis('left').setTextPen('k')
        plot_widget.getAxis('bottom').setTextPen('k')
        plot_widget.getAxis('left').setPen('k')
        plot_widget.getAxis('bottom').setPen('k')

        # Set size policy
        plot_widget.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)

        return plot_widget

    def create_table(self, headers):
        table = QTableWidget()
        table.setColumnCount(len(headers))
        table.setHorizontalHeaderLabels(headers)
        table.setStyleSheet("""
            QTableWidget {
                background-color: white;
                alternate-background-color: #f9f9f9;
                border: 1px solid #ddd;
            }
            QHeaderView::section {
                background-color: #f0f0f0;
                padding: 4px;
                border: 1px solid #ddd;
                font-weight: bold;
            }
        """)
        # Set column widths
        header = table.horizontalHeader()
        for i in range(len(headers)):
            header.setSectionResizeMode(i, header.Stretch)

        table.setAlternatingRowColors(True)
        return table

    def refresh_data(self):
        selected_app = self.app_dropdown.currentText()

        # Update KPIs
        for widget in self.kpi_widgets:
            value_label = widget.findChild(QLabel, "value_label")
            if value_label:
                value_label.setText(str(random.randint(50, 1000)))

        # Update graphs
        self.update_graphs()

        # Update tables
        self.update_tables()

    def update_graphs(self):
        timestamps = [datetime.now() - timedelta(days=x) for x in range(30)]
        x_values = [ts.timestamp() for ts in timestamps]

        # Update each graph with different colors
        graphs = [
            (self.user_graph, '#2ecc71', 'User Logins'),
            (self.issues_graph, '#e74c3c', 'Issues'),
            (self.records_graph, '#3498db', 'Records')
        ]

        for graph, color, name in graphs:
            graph.clear()
            y_values = [random.randint(0, 100) for _ in range(30)]
            pen = pg.mkPen(color=color, width=2)
            graph.plot(x_values, y_values, pen=pen, name=name)

            # Add date axis
            axis = pg.DateAxisItem(orientation='bottom')
            graph.setAxisItems({'bottom': axis})

    def update_tables(self):
        # Update error log
        self.error_table.setRowCount(10)
        error_types = ["Critical", "Warning", "Error", "Info"]

        for i in range(10):
            time_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            error_type = random.choice(error_types)
            self.error_table.setItem(i, 0, QTableWidgetItem(time_str))
            self.error_table.setItem(i, 1, QTableWidgetItem(error_type))
            self.error_table.setItem(i, 2, QTableWidgetItem(f"Sample error message {i + 1}"))
            self.error_table.setItem(i, 3, QTableWidgetItem(self.app_dropdown.currentText()))

        # Update access log
        self.access_table.setRowCount(10)
        actions = ["Login", "Logout", "Download", "Upload", "View"]

        for i in range(10):
            time_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            action = random.choice(actions)
            self.access_table.setItem(i, 0, QTableWidgetItem(time_str))
            self.access_table.setItem(i, 1, QTableWidgetItem(f"User_{i + 1}"))
            self.access_table.setItem(i, 2, QTableWidgetItem(action))
            self.access_table.setItem(i, 3, QTableWidgetItem(self.app_dropdown.currentText()))


if __name__ == '__main__':
    app = QApplication(sys.argv)

    # Set application style
    app.setStyle('Fusion')

    dashboard = Dashboard()
    dashboard.show()
    sys.exit(app.exec_())