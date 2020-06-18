import React from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';

class Sales extends React.Component {

    constructor(props) {
        super(props);
        this.state = { sales: [], currentPage: 1 };
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    componentDidMount() {

        this.getData(this.state.currentPage).then(data => this.setState({ sales: data }))

    }

    previousPage() {

        if (this.state.currentPage > 1) {
            this.setState((prevState) => {
                this.getData(prevState.currentPage - 1).then(data => this.setState({ sales: data }));
                return {
                    currentPage: prevState.currentPage - 1
                }
            })
        }
    }

    nextPage() {
        this.setState((prevState) => {
            this.getData(prevState.currentPage + 1).then(data => this.setState({ sales: data }));
            return {
                currentPage: prevState.currentPage + 1
            }
        })
    }

    getData(page) {

        const promise = new Promise((success, rejectionFunc) => {

            fetch(`/api/sales?page=${page}&perPage=${10}`).then(res => res.json()).then(data => {
                success(data);
            })

        });

        return promise;
    }

    render() {
        if (this.state.sales.length > 0) {
            return (
                <div>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Store Location</th>
                                <th>Number of Items</th>
                                <th>Sale Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.sales.map(sale => {
                                return (
                                    <tr key={sale._id} onClick={()=>{this.props.history.push(`/Sale/${sale._id}`)}}>
                                        <th>{sale.customer.email}</th>
                                        <th>{sale.storeLocation}</th>
                                        <th>{sale.items.length}</th>
                                        <th>{new Date(sale.saleDate).toLocaleDateString()}</th>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.Prev />
                        <Pagination.Item>{this.state.currentPage}</Pagination.Item>
                        <Pagination.Next />
                    </Pagination>
                </div>
            );
        } else {
            return null; // NOTE: This can be changed to render a <Loading /> Component for a better user experience
        }
    }
}

export default withRouter(Sales);