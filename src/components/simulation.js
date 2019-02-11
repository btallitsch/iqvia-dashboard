import React, { Component } from 'react';
import { Table, Popconfirm, Input, Button, Form, } from 'antd';
import { Bar } from 'react-chartjs-2';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  }

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                  <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                  >
                    {restProps.children}
                  </div>
                )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}


class Simulation extends Component {
  constructor(props){
    super(props);

    this.columns = [
    {
      title: 'Features',
      dataIndex: 'feature',
      width: '50%'
    }, 
    {
      title: 'Current Value',
      dataIndex: 'current_value',
      width: '25%'
    }, 
    {
      title: 'Next Value',
      dataIndex: 'next',
      editable: true,
      width: '25%'
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => (
        this.state.dataSource.length >= 1
          ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a href="javascript:;">Delete</a>
            </Popconfirm>
          ) : null
      ),
    }];

    this.state = {
      clearDisabled: true,
      dataSource: [
      {
        key: '1',
        feature: 'Copay Card',
        current_value: 'Y',
        next: 'N'
      },
      {
        key: '2',
        feature: 'Product Average Copay',
        current_value: 35.8,
        next: 23.6
      }]
   };

   this.runSimulation = this.runSimulation.bind(this);

  }

  runSimulation() {

    const A_Current_Value = Number(this.state.dataSource[2].current_value);
    const A_Feature_Value = Number(this.state.dataSource[2].next);
    const B_Current_Value = Number(this.state.dataSource[3].current_value);
    const B_Feature_Value = Number(this.state.dataSource[3].next);

    const alpha = (A_Feature_Value - A_Current_Value) / A_Current_Value;
    const beta = (B_Feature_Value - B_Current_Value) / B_Current_Value;

    let patientCount = 6420 * (alpha + beta) / 2;

    this.setState({
      newPatientCount: Math.round( patientCount * 10 ) / 10
    });
    
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  handleClear = () => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.splice(0, dataSource.length - 2) });
    // TODO: clear checked rows here
  }

  // contains selected row data from App/drivers
  componentWillReceiveProps(nextProps){
    const { dataSource } = this.state;
    setTimeout(
      function() {
        let newDataFormatted = {};
        const newData = this.props.onSelectRow;
        if(newData.length > 1) {
          newDataFormatted = {
            key: 4,
            feature: newData[1].feature,
            current_value: Number(newData[1].current_value),
            next: null
          }
        } else if(newData.length == 1) {
          newDataFormatted = {
            key: 3,
            feature: newData[0].feature,
            current_value: Number(newData[0].current_value),
            next: null
          }
        }
        if(newData.length == 2) {
          this.setState({
            clearDisabled: false
          });
        }
        if(newData.length > 2) {
          this.setState({
            clearDisabled: true
          });
        }
        this.setState({
          dataSource: [...dataSource, newDataFormatted]
        });
      }
      .bind(this),
      150
    );
  }

  render(){

    const resultColumns = [
      {
        title: 'Result',
        dataIndex: 'result'
      }, 
      {
        title: 'Original',
        dataIndex: 'original'
      }, 
      {
        title: 'New',
        dataIndex: 'new'
      }];
      
    const resultData = [
      {
        key: '1',
        result: 'Total Patient Count',
        original: 6420,
        new: this.state.newPatientCount,
      }];

    const chartData = {
      labels: ['Original', 'New'],
      datasets: [
        {
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [6420, this.state.newPatientCount]
        }
      ]
    };

    const chartOptions = {
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 20,
          bottom: 0
        }
      }
    };

    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
      <div>
          <Table
            title={() => 'Selected Driver to Change'}
            columns={columns}
            bordered
            size="small"
            pagination={false}
            dataSource={dataSource}
            components={components}
            rowClassName={() => 'editable-row'}
          />
          <Button
            type="primary"
            className='simulation-button'
            size="large"
            onClick={this.runSimulation}
          >
            Run Simulation
          </Button>
          <Button
            onClick={this.handleClear}
            className='clear-button'
            size="large"
            disabled={this.state.clearDisabled}
          >
            Clear selections
          </Button>
          <Table
            title={() => 'Simulation Result'}
            className="results-table"
            columns={resultColumns}
            bordered
            size="small"
            pagination={false}
            dataSource={resultData}
          />
          <Bar
            options={chartOptions}
            data={chartData}
            legend={{ display: false }}
          />
      </div>
    );
  }
}

export default Simulation;