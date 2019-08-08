
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ManageApiDocsComponent } from './manage-api-docs.component';


describe('ManageApiDocsComponent', () => {
    let component: ManageApiDocsComponent;
    let fixture: ComponentFixture<ManageApiDocsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, QuillModule.forRoot()],
            declarations: [ManageApiDocsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageApiDocsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not update if dataList is undefined', () => {
        spyOn(component.clickUpdate, 'emit');

        expect(() => component.update()).toThrowError();
        expect(component.clickUpdate.emit).toHaveBeenCalledTimes(0);
        expect(component.submitted).toBeTruthy();
    });

    it('should not update if dataList[Brief Description] is empty', () => {
        component.dataList = {
            'Brief Description': '',
            Documentation: 'Documentation Sample Text'
        } as any;
        fixture.detectChanges();

        spyOn(component.clickUpdate, 'emit');
        component.update();

        expect(component.clickUpdate.emit).toHaveBeenCalledTimes(0);
        expect(component.submitted).toBeTruthy();
    });

    it('should not update if dataList[Documentation] is empty', () => {
        component.dataList = {
            'Brief Description': 'Brief Description Sample Text',
            Documentation: ''
        } as any;
        fixture.detectChanges();

        spyOn(component.clickUpdate, 'emit');
        component.update();

        expect(component.clickUpdate.emit).toHaveBeenCalledTimes(0);
        expect(component.submitted).toBeTruthy();
    });

    it('should  update if dataList is valid', () => {
        component.dataList = {
            'Brief Description': 'Brief Description Sample Text',
            Documentation: 'Documentation Sample Text'
        } as any;
        fixture.detectChanges();

        spyOn(component.clickUpdate, 'emit');
        component.update();

        expect(component.clickUpdate.emit).toHaveBeenCalledTimes(1);
        expect(component.submitted).toBeTruthy();
    });

    it('should update file name after upload', () => {
        const mockFile = {
            name: 'test.jpg',
            type: 'image.jpg'
        };
        const mockEvent = { srcElement: { files: [mockFile] } };

        component.selectFile(mockEvent);

        expect(component.uploadedFile).toBe(mockFile.name);
    });
});
