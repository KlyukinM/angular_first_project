import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  devices: any
  response: any
  errorMsg: string = ''

  constructor(private route: Router, private service: EquipmentService) {
    this.devices = service.getDevices().subscribe(result => {
      this.response = result      
      this.devices = this.response.data.metering_devices.data      
      this.timeFormat(this.devices)
    }, (error: any) => {
      if (error.status !== 0) {        
        this.errorMsg = error.error.error.msg
      } else {
        this.errorMsg = error.message
      }     
      
    })       
  }

  private timeFormat(array: any) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].last_active) {              
        let date = new Date(array[i].last_active)
        let timeFormatted = date.toLocaleString('ru-RU', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
        array[i].time = timeFormatted
      } else {
        array[i].time = null
      }
    }
  }

  ngOnInit(): void {
       
  }

  logout() {
    localStorage.clear()
    this.route.navigate([''])
  }
}
