import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../services/admin/dashboard.service';
import { Transaction } from '../../../interface/admin/transaction';
import { CardModule } from 'primeng/card';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../enviroment';

@Component({
  selector: 'app-page-dashboard',
  imports: [TableModule, CardModule, CommonModule],
  templateUrl: './page-dashboard.component.html',
  styleUrl: './page-dashboard.component.css'
})
export class PageDashboardComponent {
  private listTransactions : Transaction[] = []
  private listTransactionsTranslations: {
    ID: string;
    Vendedor: string;
    "Usuario Conectado": string;
    Monto: number;
    Comisión: number;
    "Comision de Aplicacion": number;
    Neto: number;
    Moneda: string;
    Fecha: string;
    Cuenta: string;
  }[] = []
  private socket: Socket;

  constructor(private dashboardService : DashboardService) {
    this.socket = io(`${environment.APIUrl}`)
  }
  ngOnInit() {
    this.loadTransactions();
    this.socket.on('nuevaTransaccion', () => {
      console.log('⚡ Nueva transacción detectada por WebSocket');
      this.loadTransactions();
    });
  }

  loadTransactions() {
    this.dashboardService.getTransactions().subscribe(
      (response) => {
        this.listTransactions = response;
        this.listTransactionsTranslations = [];
        this.listTransactions.forEach(transaction => {
          const item = {
            "ID": transaction.id,
            "Vendedor": transaction.customer,
            "Usuario Conectado": transaction.connected_user,
            "Monto": transaction.amount,
            "Comisión": transaction.fee,
            "Comision de Aplicacion": transaction.application_fee_amount,
            "Neto": transaction.net,
            "Moneda": transaction.currency,
            "Fecha": transaction.created,
            "Cuenta": transaction.id_account
          };
          this.listTransactionsTranslations.push(item);
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  get ListTransactions () {
    return this.listTransactions
  }

  get ListTransactionsTranslations () {
    return this.listTransactionsTranslations
  }

}
