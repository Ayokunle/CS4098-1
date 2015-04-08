proc isTrue { v } {
  return [expr {![string is false ${v}]}]
}

proc default { path } {
    exists $path
}

proc strlen s {
    set n 0
    foreach char [split $s ""] {incr n}
    set n
 } ;# RS

proc exists { path } {
    
    puts $path
    if {[catch {set r $path}]} {
        return 0
    }
    expr [file exists $path]
    
   #  set fp [open "patient_id.txt" r]
   #  set patient_id [read $fp]
   #  close $fp
    
   #  #puts $patient_id
   #  set symptoms "_symptoms.txt"
   #  set file [concat $patient_id$symptoms]
   #  file mkdir -booleanresult data
   #  set f [open ../../models/$file w+]

   #  set mfp [open "model.txt" r]
   #  set model [read $mfp]
   #  close $mfp
   # # puts $model

   #  set format ".res"
   #  set file1 [concat $model$format]
   #  set f [open ../../models/$file1 w+]   
    
   #  set len [strlen $path]
   #  set path [ string replace $path 0 1 ]
   #  set len [strlen $path]
   #  puts  [concat $path <-]
   #  set path [ string replace $path $len-1 $len ]
   #  puts [concat $path -><-]

   #  puts $f [concat $path : $file]
   #  close $f

   #  expr [file exists ../../models/$file1]
}

proc ax { path } {
    return 5
}

proc filecount { path } {
    if {[catch {set r $path}]} {
        return 0
    }
    if {![file exists $path]} {
        return 0
    }
    set i 0
    foreach f [exec ls $path] {
        incr {i}
    }
    expr $i
}

proc filesize { path } {
    if {[catch {set r $path}]} {
        return 0
    }
    if {![file exists $path]} {
        return 0
    }
    expr [file size $path]
}

proc timestamp { path } {
    if {[catch {set r $path}]} {
        return 0
    }
    if {![file exists $path]} {
        return 0
    }
    expr [file mtime $path]
}

proc misspellcount { path } {
    if {[catch {set r $path}]} {
        return 0
    }
    if {![file exists $path]} {
        return 0
    }
    set i 0
    foreach f [exec spell $path] {
        incr {i}
    }
    expr $i
}

package ifneeded mysqltcl 3.05 \
    [list load [file join [pwd] libmysqltcl3.05.so] mysqltcl]

package require mysqltcl

proc Confirmed_Dementia { resource } {

    set fp [open "patient_id.txt" r]
    set file_data [read $fp]
    close $fp

    set handle [mysqlconnect -user root]
    mysqluse $handle mysql
    #puts $handle
    foreach res [mysqlsel $handle "select pid, title from openemr.lists where pid = '$file_data'" -list] {
        if {[string match -nocase *dementia* [lindex $res 1] ]} {
            return 1
        }
    }
    mysqlclose $handle
    return 0
}

proc suspect_diabetes { resource }  {
    set fp [open "patient_id.txt" r]
    set file_data [read $fp]
    close $fp

    set handle [mysqlconnect -user root]
    mysqluse $handle mysql
    #puts $handle
    foreach res [mysqlsel $handle "select pid, title from openemr.lists where pid = '$file_data'" -list] {
        if {[string match -nocase *diabetes* [lindex $res 1] ]} {
            return 1
        }
    }
    mysqlclose $handle
    return 0
}

proc glucose_test { resource }  {
    set fp [open "patient_id.txt" r]
    set file_data [read $fp]
    close $fp

    set handle [mysqlconnect -user root]
    mysqluse $handle mysql
    #puts $handle
    foreach res [mysqlsel $handle "select foreign_id, url from openemr.documents where foreign_id = '$file_data'" -list] {
        if {[string match -nocase *glucose_test* [lindex $res 1] ]} {
            return 1
        }
    }
    mysqlclose $handle
    return 0
}

proc cholesterol_test { resource }  {
    set fp [open "patient_id.txt" r]
    set file_data [read $fp]
    close $fp

    set handle [mysqlconnect -user root]
    mysqluse $handle mysql
    #puts $handle
    foreach res [mysqlsel $handle "select foreign_id, url from openemr.documents where foreign_id = '$file_data'" -list] {
        if {[string match -nocase *cholesterol_test* [lindex $res 1] ]} {
            return 1
        }
    }
    mysqlclose $handle
    return 0
}

proc diabetes { resource }  {
    set fp [open "patient_id.txt" r]
    set file_data [read $fp]
    close $fp

    set handle [mysqlconnect -user root]
    mysqluse $handle mysql
    #puts $handle
    foreach res [mysqlsel $handle "select pid, title from openemr.lists where pid = '$file_data'" -list] {
        if {[string match -nocase *diabetes* [lindex $res 1] ]} {
            return 1
        }
    }
    mysqlclose $handle
    return 0
}

proc requests_privacy { resource }  {
    return 0
}

proc reviewed { resource } {
    return 0
}

proc respite_care { resource } {
    return 0
}

proc appropriate_setting { resource } {
    return 0
}

proc medication { resource } {
    return 0
}

proc disability { resource } {
    return 0
}

proc sensory_impairment { resource } {
    return 0
}
proc lingustic_problems { resource } {
    return 0
}
proc speech_problems { resource } {
    return 0
}
proc alternative_assessment_method { resource } {
    return 0
}
proc depression { resource } {
    return 0
}
proc psychosis { resource } {
    return 0
}
proc delirium { resource } {
    return 0
}
proc parkinsons_disease { resource } {
    return 0
}
proc stroke { resource } {
    return 0
}
proc anxiety { resource } {
    return 0
}

proc symptoms { resource } {
    return 0
}

proc status { resource } {
    return 0
}

set non_cognitive_symptoms 1
set challenging_behaviour 1
set early_assessment 1
set risk_of_harm_or_distress 1
set medication 1
