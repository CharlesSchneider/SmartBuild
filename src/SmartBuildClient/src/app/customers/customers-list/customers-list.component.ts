import { Component, OnInit } from '@angular/core';

import { PagedResponse } from '../../models/paged-response';
import { Customer } from '../../models/customer';
import { ApiConstants } from '../../shared/api/api.service';
import { BaseComponent } from 'src/app/shared/base.component';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

@Component({
  selector: 'sb-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent extends BaseComponent implements OnInit {
  dataLoaded = false;
  dataTable: any;
  dtOptions: any = {};
  searchTerm = '';

  constructor() { super(); }

  ngOnInit(): void {
    this.dtOptions = { // https://datatables.net/reference/option/
      lengthMenu: [
        [10, 20, 30],
        ['10', '20', '30']
      ],
      // dom: 'rt<"bottom"lpi><"clear">', // https://datatables.net/release-datatables/examples/basic_init/dom.html
      // https://datatables.net/release-datatables/examples/basic_init/dom.html
      dom: 't<"row align-items-center bg-light p-2 shadow-sm"<"col-sm-4 pt-1"l><"col-sm-4"i><"col-sm-4"p>>',
      pagingType: 'simple_numbers', // https://datatables.net/reference/option/pagingType
      serverSide: true,
      language: {
        sEmptyTable: 'Nenhum registro encontrado',
        sInfo: 'Exibindo de _START_ até _END_ de _TOTAL_ registros',
        sInfoEmpty: 'Exibindo 0 até 0 de 0 registros',
        // sInfoFiltered: '(Filtrados de _MAX_ registros)',
        sInfoFiltered: '',
        sInfoPostFix: '',
        sInfoThousands: '.',
        sLengthMenu: 'Exibir _MENU_ resultados por página',
        sLoadingRecords: 'Carregando...',
        sProcessing: 'Processando...',
        sZeroRecords: 'Nenhum registro encontrado',
        sSearch: 'Pesquisar',
        oPaginate: {
          sNext: '&raquo;',
          sPrevious: '&laquo;',
          sFirst: 'Primeiro',
          sLast: 'Último'
        },
        oAria: {
          sSortAscending: ': Ordenar colunas de forma ascendente',
          sSortDescending: ': Ordenar colunas de forma descendente'
        },
        select: {
          rows: {
            _: 'Selecionado %d linhas',
            0: 'Nenhuma linha selecionada',
            1: 'Selecionado 1 linha'
          }
        },
        buttons: {
          copy: 'Copiar para a área de transferência',
          copyTitle: 'Cópia bem sucedida',
          copySuccess: {
            1: 'Uma linha copiada com sucesso',
            _: '%d linhas copiadas com sucesso'
          }
        }
      },
      columns: [
        { name: 'customerId', data: 'customerId' },
        { name: 'name', data: 'name' },
        { name: 'email', data: 'email' },
        {
          data: null,
          orderable: false,
          render: (data, type, row) => {
            return `
            <a id="editButton" class="btn" (click)="rowClick(data)" title="Editar">
              <svg width="1.4em" height="1.4em" viewBox="0 0 16 16" class="bi bi-pen" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M5.707 13.707a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391L10.086 2.5a2 2 0 0 1 2.828 0l.586.586a2 2 0 0 1 0 2.828l-7.793 7.793zM3 11l7.793-7.793a1 1 0 0 1 1.414 0l.586.586a1 1 0 0 1 0 1.414L5 13l-3 1 1-3z" />
                <path fill-rule="evenodd"
                  d="M9.854 2.56a.5.5 0 0 0-.708 0L5.854 5.855a.5.5 0 0 1-.708-.708L8.44 1.854a1.5 1.5 0 0 1 2.122 0l.293.292a.5.5 0 0 1-.707.708l-.293-.293z" />
                <path d="M13.293 1.207a1 1 0 0 1 1.414 0l.03.03a1 1 0 0 1 .03 1.383L13.5 4 12 2.5l1.293-1.293z" />
              </svg>
            </a>
            <a id="deleteButton" class="btn" (click)="rowClick(data)" title="Excluir">
              <svg width="1.4em" height="1.4em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg>
            </a>`;
          }
        }
      ],
      order: [
        [1, 'asc']
      ],
      columnDefs: [
        {
          targets: 0,
          visible: false,
          searchable: false
        },
        {
          targets: -1,
          className: 'text-right'
        }
      ],
      ajax: (data: any, callback, settings) => {
        this.startLoading();

        const draw = data.draw;
        const start = data.start;
        const length = data.length;
        const search = this.searchTerm;
        const order = data.columns[data.order[0].column].name;
        const orderDir = data.order[0].dir;
        const pagingQuery = `${search ? 'searchTerm=' + search : ''}&start=${start}&length=${length}&order=${order}&orderDir=${orderDir}`;

        this.apiService.get<PagedResponse<Customer[]>>(`${ApiConstants.customersList}?${pagingQuery}`)
          .subscribe(response => {
            this.dataLoaded = true;
            callback({
              recordsTotal: response.totalRecords,
              recordsFiltered: response.totalFilteredRecords,
              data: response.data
            });

            this.stopLoading();
          },
            error => this.handleError(error));
      },
      rowCallback: (row: Node, data: Customer, index: number) => {
        jQuery('#editButton', row).off('click');
        jQuery('#deleteButton', row).off('click');

        jQuery('#editButton', row).on('click', () => {
          this.router.navigate([`clientes/${data.customerId}/editar`]);
        });

        jQuery('#deleteButton', row).on('click', () => {
          this.modalService.showConfirmationModal('Exclusão', `Deseja excluir o cliente ${data.name}?`,
            undefined, 'Excluir o Cliente', undefined, true)
            .result
            .then(result => {
              if (result) {
                this.startLoading();
                this.apiService.delete(ApiConstants.customers, data.customerId)
                  .subscribe(response => {
                    this.doSearch();
                  },
                    error => this.handleError(error));
              }
            });
        });

        return row;
      }
    };

    const table: any = $('table');
    this.dataTable = table.DataTable(this.dtOptions);
  }


  doSearch() {
    this.dataTable.search('').draw();
  }

  newClient() {
    this.router.navigate(['/clientes', 'novo']);
  }
}
