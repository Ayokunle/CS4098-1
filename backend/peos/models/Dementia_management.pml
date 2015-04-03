/* 
 * Dementia management pathway, from Pádraig O’Leary, John Noll, and Ita Richardson, 
 * "A Resource Flow Approach to Modelling Care Pathways," FHEIS 2013, Macao.
 */

process Dementia_management {

  action identify_causal_or_exacerbating_factors { 
    requires { Guidelines_For_Treatment_Of_Patients }
  }

  action provide_patient_carer_with_information {
    agent {GP && patient && carer}
    requires {
      patient_id.Confirmed_Dementia
      && patient_id.requests_privacy == "false" 
    }
    provides { information_to_carer }
  } 

  action create_treatment_or_care_plan {
    agent {
      memory_assessment_service 
      && GP && clinical_psychologiest && nurses
      && occupational_therapists && phsiotherapists 
      && speech_and_language_therapists 
      && social_workers && voluntary_organisation
    }
    requires { patient_history }
    provides { care_plan }
  }
  
  branch  {

    branch cognitive_symptom_mgt {

      action non_medication_interventions {
        provides { 
          support_for_carer && info_about_servicesAndInterventions 
          && (optional) cognitive_simulation
        }
      }
      
    
    } /* end of management_of_cognitive_symptoms  */

    branch non_cognitive_symptom_mgt {

      action medication_interventions {
        requires { risk_of_harm_or_distress}
        provides { medication }
      }

    } /* end of management_of_non_cognitive_symptoms */
  
  } /* end cognitive/non-cognitive symptoms branch */

} /* process */

