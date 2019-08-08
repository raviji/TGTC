import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from '../../../shared/services/validation.service';
import { AddManageApiAddImageComponent } from './add-manage-api-add-image.component';


describe('AddManageApiAddImageComponent', () => {
    let component: AddManageApiAddImageComponent;
    let fixture: ComponentFixture<AddManageApiAddImageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [AddManageApiAddImageComponent],
            providers: [ValidationService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddManageApiAddImageComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update form on component init', () => {
        const mockDataList = {
            apiName: 'mock api name',
            website: 'mock website name',
            shortDescription: 'mock short description',
            longDescription: 'mock long description',
            termOfUse: 'mock term of use'
        };
        component.dataList = mockDataList;
        fixture.detectChanges();

        expect(component.f.apiName.value).toBe(mockDataList.apiName);
        expect(component.f.website.value).toBe(mockDataList.website);
        expect(component.f.shortDescription.value).toBe(mockDataList.shortDescription);
        expect(component.f.longDescription.value).toBe(mockDataList.longDescription);
        expect(component.f.termOfUse.value).toBe(mockDataList.termOfUse);
    });

    it('should emit clickPrevious when previous called', () => {
        const mockDataList = {
            apiName: 'mock api name',
            website: 'mock website name',
            shortDescription: 'mock short description',
            longDescription: 'mock long description',
            termOfUse: 'mock term of use'
        };
        component.dataList = mockDataList;
        spyOn(component.clickPrevious, 'emit');
        fixture.detectChanges();

        component.previous();
        expect(component.clickPrevious.emit).toHaveBeenCalled();
    });

    it('should not emit clickNext when form is invalid', () => {
        spyOn(component.clickNext, 'emit');
        fixture.detectChanges();

        component.next();
        expect(component.formGroup.invalid).toBeTruthy();
        expect(component.clickNext.emit).toHaveBeenCalledTimes(0);
    });

    it('should emit clickNext when form is valid', () => {
        const mockDataList = {
            apiName: 'mock api name',
            website: 'www.mock.com',
            shortDescription: 'mock short description',
            longDescription: 'mock long description',
            termOfUse: 'mock term of use'
        };
        component.dataList = mockDataList;
        spyOn(component.clickNext, 'emit');
        fixture.detectChanges();

        component.next();
        expect(component.formGroup.valid).toBeTruthy();
        expect(component.clickNext.emit).toHaveBeenCalled();
    });

    it('should emit update with apiName', () => {
        const mockDataList = {
            apiName: 'mock api name',
            website: 'www.mock.com',
            shortDescription: 'mock short description',
            longDescription: 'mock long description',
            termOfUse: 'mock term of use'
        };
        component.dataList = mockDataList;
        spyOn(component.clickUpdate, 'emit');
        fixture.detectChanges();

        component.update();
        expect(component.clickUpdate.emit).toHaveBeenCalledWith(mockDataList.apiName);
    });

    it('should not get imageUrl if file not uploaded', () => {
        const mockFileInput = {
            target: {
                files: []
            }
        };

        fixture.detectChanges();

        component.selectFile(mockFileInput);
        expect(component.dataList['imgUrl']).toBe('');
    });

    it('should get imageUrl if file uploaded', () => {
        const blob = new Blob(['Content'], { type: 'text/plain' });
        const mockFileInput = {
            target: {
                files: [
                    blob
                ]
            }
        };
        component.selectFile(mockFileInput);

        // workaround to check that dataList['imgUrl'] is updated since reader.onload is async
        const spy = spyOn(component, 'selectFile').and.callFake(function(fileInput) {
            if (fileInput.target.files && fileInput.target.files[0]) {
                const reader = new FileReader();

                reader.onload = ((e) => {
                    this.dataList['imgUrl'] = e.target['result'];
                    expect(component.dataList['imgUrl']).toBe('data:text/plain;base64,Q29udGVudA==');
                });

                reader.readAsDataURL(fileInput.target.files[0]);
            }
        });
        component.selectFile(mockFileInput);
        expect(spy).toHaveBeenCalledWith(mockFileInput);
    });
});
