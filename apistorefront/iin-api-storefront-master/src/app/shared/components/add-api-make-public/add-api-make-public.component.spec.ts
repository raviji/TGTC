import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddApiMakePublicComponent } from './add-api-make-public.component';


describe('AddApiMakePublicComponent', () => {
    let component: AddApiMakePublicComponent;
    let fixture: ComponentFixture<AddApiMakePublicComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AddApiMakePublicComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddApiMakePublicComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('button should emit clickPrevious event when clicking previous', () => {
        spyOn(component.clickPrevious, 'emit');
        component.previous();

        expect(component.clickPrevious.emit).toHaveBeenCalled();
    });

    it('should emit clickNext event when clicking next', () => {
        spyOn(component.clickNext, 'emit');
        component.next();

        expect(component.clickNext.emit).toHaveBeenCalled();
    });

});
