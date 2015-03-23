proc isTrue { v } {
  return [expr {![string is false ${v}]}]
}

proc default { path } {
    exists $path
}

proc exists { path } {
#    puts $path
    if {[catch {set r $path}]} {
        return 0
    }
    expr [file exists $path]
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
    foreach res [mysqlsel $handle "select pid, title from openemr.lists where pid = $file_data" -list] {
        if {[string match -nocase *dementia* [lindex $res 1] ]} {
            return 1
        }
    }
    mysqlclose $handle
    return 0
}

proc requests_privacy { patient_id }  {
    return 0
}