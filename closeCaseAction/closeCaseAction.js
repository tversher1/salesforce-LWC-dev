import { LightningElement, api } from "lwc";
import { updateRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import ID_FIELD from '@salesforce/schema/Case.Id';
import STATUS_FIELD from '@salesforce/schema/Case.Status';

export default class closeCaseAction extends LightningElement {
  
  @api recordId;
  @api async invoke() {

    const fields = {};
    fields[ID_FIELD.fieldApiName] = this.recordId;
    fields[STATUS_FIELD.fieldApiName] = 'Case Closed';
    const recordInput = { fields };

    updateRecord(recordInput)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Case Closed',
                    variant: 'success'
                })
            );
          })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Could not close case',
                    message: error.body.message,
                    variant: 'error'
                  })
                  );
                });
              }
            }
