import { Directive, EventEmitter, Input, OnInit, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { JwtService } from '../services/jwt.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Output() hasRole = new EventEmitter<boolean>(false);
  userRole: string = '';

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _templateRef: TemplateRef<any>,
    private _jwt: JwtService
  ) { }

  ngOnInit(): void {
    this.userRole = this._jwt.getRoleFromToken();
    this.roleChecker(this.appHasRole);
  }

  @Input()
  appHasRole: string[] = [];

  roleChecker(appHasRole: string[]) {
    if (this.userRole === '') {
      this._viewContainerRef.clear();
      this.hasRole.emit(false);
    } else {
      const idx = appHasRole.findIndex(role => this.userRole.indexOf(role) !== -1);
      idx >= 0 ? this._viewContainerRef.createEmbeddedView(this._templateRef) : this._viewContainerRef.clear();
      this.hasRole.emit(true);
    }
  }

}
