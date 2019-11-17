import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { InputNumber } from 'antd'
class ListProduct extends Component {
    state = {
        listProduct: [
            {
                'id': '01',
                'name': 'Samsung Galaxy',
                'quanlity': '01',
                'price': '12000000',
                'money': ''
            },
            {
                'id': '02',
                'name': 'Note 2',
                'quanlity': '02',
                'price': '15500000',
                'money': ''
            },
            {
                'id': '03',
                'name': 'Hawei',
                'quanlity': '01',
                'price': '21000000',
                'money': ''
            },
            {
                'id': '04',
                'name': 'Iphone 10',
                'quanlity': '01',
                'price': '30000000',
                'money': ''
            },
        ],
        sum: 0,
        dataLoad: []
    }
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    onChangeQuanlity(value, id) {
        const newList = this.state.listProduct
        let dataAfterUpdate = []
        var total =0;
        newList.map((val) => {
            let objetTmp = { ...val, money: parseInt(val.price + "") }
            if (objetTmp.id === id) {
                objetTmp.quanlity = value;
                objetTmp.money = parseInt(value) * parseInt(val.price)
            }
            total += objetTmp.money;
            dataAfterUpdate.push(objetTmp)
        })
        this.setState({ listProduct: dataAfterUpdate, sum: total })

    }
    delete = (idx) => {
        const newList = this.state.listProduct
        let dataAfterUpdate = []
        var total = 0;
        newList.splice(idx, 1)
        newList.map((val) => {
            let objetTmp = { ...val, money: parseInt(val.price + "") }
            total += objetTmp.money;
            dataAfterUpdate.push(objetTmp)
        })
        this.setState({ listProduct: dataAfterUpdate, sum: total })
    }
    // componentWillMount(){
    //     const newList = this.state.listProduct
    //     var total = 0;
    //     newList.map((val) => {
    //         let objetTmp = { ...val, money: parseInt(val.price + "") }
    //         total += objetTmp.money;
    //     })
    //     this.setState({ listProduct: dataLoad, sum: total }) 
    // }
    render() {
        const { listProduct, sum } = this.state
        // console.log(listProduct)
        return (
            <div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Id</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Tổng giá</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listProduct.map((item, idx) => {
                            return (
                                <tr>
                                    <td>{idx + 1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{this.formatNumber(parseInt(item.price))}</td>
                                    <td>
                                        <InputNumber min='1' defaultValue={item.quanlity} onChange={(val) => this.onChangeQuanlity(val, item.id)} />
                                    </td>
                                    {(item.money === '') ?
                                        <td>{this.formatNumber(parseInt(item.price) * parseInt(item.quanlity))}</td>:
                                        <td>{this.formatNumber(item.money)}</td>
                                    }
                                    <td><Button onClick={() => this.delete(idx)}>Xóa</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                    <p>TỔNG CỘNG: {this.formatNumber(sum)} VND</p>
            </div>
        );
    }
}

export default ListProduct;