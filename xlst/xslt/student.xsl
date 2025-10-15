<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="/students">
    <html>
      <head>
        <title>Student Details</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background: #f5f7fa;
          }
          h2 {
            color: #333;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
          }
          th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ccc;
          }
          th {
            background: #0078D7;
            color: white;
          }

          /* List View */
          .list-view {
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 10px 20px;
            margin-bottom: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }

          /* Card View */
          .card-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
          }
          .card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.15);
            padding: 20px;
            width: 250px;
            transition: transform 0.2s;
          }
          .card:hover {
            transform: scale(1.05);
          }
          .card h3 {
            margin-top: 0;
            color: #0078D7;
          }
          .card p {
            margin: 5px 0;
          }
        </style>
      </head>

      <body>
        <h2> Student Details (Table View)</h2>
        <table>
          <tr>
            <th>Full Name</th>
            <th>Year</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Previous CGPA</th>
            <th>Current SGPA</th>
          </tr>
          <xsl:for-each select="student">
            <tr>
              <td><xsl:value-of select="fullName"/></td>
              <td><xsl:value-of select="year"/></td>
              <td><xsl:value-of select="department"/></td>
              <td><xsl:value-of select="semester"/></td>
              <td><xsl:value-of select="previousCGPA"/></td>
              <td><xsl:value-of select="currentSGPA"/></td>
            </tr>
          </xsl:for-each>
        </table>

        <h2> List View</h2>
        <xsl:for-each select="student">
          <div class="list-view">
            <b><xsl:value-of select="fullName"/></b> — 
            Year <xsl:value-of select="year"/> | 
            <xsl:value-of select="department"/> Dept | 
            Semester <xsl:value-of select="semester"/> |
            Prev CGPA: <xsl:value-of select="previousCGPA"/> |
            SGPA: <xsl:value-of select="currentSGPA"/>
          </div>
        </xsl:for-each> 

        <h2> Card View</h2>
        <div class="card-container">
          <xsl:for-each select="student">
            <div class="card">
              <h3><xsl:value-of select="fullName"/></h3>
              <p><b>Year:</b> <xsl:value-of select="year"/></p>
              <p><b>Department:</b> <xsl:value-of select="department"/></p>
              <p><b>Semester:</b> <xsl:value-of select="semester"/></p>
              <p><b>Previous CGPA:</b> <xsl:value-of select="previousCGPA"/></p>
              <p><b>Current SGPA:</b> <xsl:value-of select="currentSGPA"/></p>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
