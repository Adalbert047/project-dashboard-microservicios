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
      },
      (error) => {
        console.error(error);
      }
    );
  }

  get ListTransactions () {
    return this.listTransactions
  }

}
