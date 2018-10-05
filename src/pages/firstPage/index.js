import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';
const dateFormat = 'YYYY-MM-DD';

class FirstPage extends Component {
  state = {
    startValue: moment().subtract(1, 'months'),
    endValue: moment(),
  };

  disabledStartDate = startValue => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() >= endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
      // return endValue && endValue > moment().endOf('day'); // 大过今天不可选
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  checkDays = () => {
    const { startValue, endValue } = this.state;
    const pickDate = moment(endValue);
    const diffDays = pickDate.diff(moment(startValue), 'days'); //相差几天
    if (diffDays > 364) {
      console.log('相差超过一年!');
    }

    // const time1 = Date.parse(moment(startValue).format(dateFormat));
    // const time2 = Date.parse(moment(endValue).format(dateFormat));
    // const nDays = Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24));
  };
  addTime = () => {
    this.props.dispatch({
      type: 'firstPage/add',
    });
  };
  render() {
    const { startValue, endValue } = this.state;
    const { time } = this.props;
    return (
      <div>
        <h4>第一个页面</h4>
        <span>{time}</span>
        <button onClick={this.addTime}>增加</button>
        <DatePicker
          // defaultValue={moment().subtract(1, 'months')}
          allowClear={false}
          format={dateFormat}
          disabledDate={this.disabledStartDate}
          locale={locale}
          showToday={false}
          value={startValue}
          onChange={this.onStartChange}
        />
        <DatePicker
          // defaultValue={moment()}
          allowClear={false}
          format={dateFormat}
          disabledDate={this.disabledEndDate}
          locale={locale}
          showToday={false}
          value={endValue}
          onChange={this.onEndChange}
        />
        <button onClick={this.checkDays}>相差多少</button>
        <button
          onClick={() => {
            router.goBack();
          }}
        >
          返回首页
        </button>
      </div>
    );
  }
}
const mapStateToProps = ({ firstPage, myPa }) => ({ ...firstPage, ...myPa });

export default connect(mapStateToProps)(FirstPage);
