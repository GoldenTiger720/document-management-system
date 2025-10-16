// Document Signing Controller
app.controller('DocumentSigningController', ['$scope', '$rootScope', '$location', 'AuthService', 'DocumentService', 'NotificationService',
    function($scope, $rootScope, $location, AuthService, DocumentService, NotificationService) {

    $scope.currentUser = AuthService.getCurrentUser();
    $scope.documents = [];
    $scope.filteredDocuments = [];
    $scope.searchQuery = '';
    $scope.selectedDocument = null;
    $scope.showSignModal = false;
    $scope.showDetailsModal = false;
    $scope.showUploadModal = false;

    // Signing form
    $scope.signForm = {
        password: '',
        documentKey: ''
    };

    // Upload form
    $scope.uploadForm = {
        name: '',
        documentKey: '',
        attachments: []
    };

    // Filters
    $scope.statusFilter = 'all';

    // Initialize
    $scope.init = function() {
        $scope.loadDocuments();
    };

    // Load documents
    $scope.loadDocuments = function() {
        $scope.documents = DocumentService.getDocuments();
        $scope.applyFilters();
    };

    // Apply filters
    $scope.applyFilters = function() {
        $scope.filteredDocuments = $scope.documents.filter(function(doc) {
            var matchesSearch = !$scope.searchQuery ||
                doc.name.toLowerCase().indexOf($scope.searchQuery.toLowerCase()) > -1 ||
                doc.documentKey.toLowerCase().indexOf($scope.searchQuery.toLowerCase()) > -1;

            var matchesStatus = $scope.statusFilter === 'all' || doc.status === $scope.statusFilter;

            return matchesSearch && matchesStatus;
        });
    };

    // Watch for changes
    $scope.$watch('searchQuery', function() {
        $scope.applyFilters();
    });

    $scope.$watch('statusFilter', function() {
        $scope.applyFilters();
    });

    // Open sign modal
    $scope.openSignModal = function(document) {
        if ($scope.currentUser.role !== 'administrator') {
            $rootScope.showToast('Only administrators can sign documents', 'error');
            return;
        }

        if (document.status === 'signed') {
            $rootScope.showToast('This document is already signed', 'warning');
            return;
        }

        $scope.selectedDocument = document;
        $scope.signForm = {
            password: '',
            documentKey: document.documentKey
        };
        $scope.showSignModal = true;
    };

    // Close sign modal
    $scope.closeSignModal = function() {
        $scope.showSignModal = false;
        $scope.selectedDocument = null;
        $scope.signForm = {
            password: '',
            documentKey: ''
        };
    };

    // Sign document
    $scope.signDocument = function() {
        try {
            if (!$scope.signForm.password || !$scope.signForm.documentKey) {
                $rootScope.showToast('Please enter password and document key', 'error');
                return;
            }

            var signedDoc = DocumentService.signDocument(
                $scope.selectedDocument.id,
                $scope.signForm.password,
                $scope.signForm.documentKey
            );

            // Create notification
            NotificationService.createNotification({
                title: 'Document Signed',
                message: signedDoc.name + ' has been signed successfully',
                type: 'success',
                relatedDocument: {
                    id: signedDoc.id,
                    name: signedDoc.name,
                    documentKey: signedDoc.documentKey
                }
            });

            $rootScope.showToast('Document signed successfully', 'success');
            $scope.closeSignModal();
            $scope.loadDocuments();
        } catch (error) {
            $rootScope.showToast(error.message, 'error');
        }
    };

    // Open document details modal
    $scope.openDetailsModal = function(document) {
        $scope.selectedDocument = document;

        // Get signature evidence if document is signed
        if (document.status === 'signed') {
            $scope.signatureEvidence = DocumentService.getSignatureEvidence(document.id);
        } else {
            $scope.signatureEvidence = null;
        }

        $scope.showDetailsModal = true;
    };

    // Close details modal
    $scope.closeDetailsModal = function() {
        $scope.showDetailsModal = false;
        $scope.selectedDocument = null;
        $scope.signatureEvidence = null;
    };

    // Open upload modal
    $scope.openUploadModal = function() {
        $scope.uploadForm = {
            name: '',
            documentKey: '',
            attachments: []
        };
        $scope.showUploadModal = true;
    };

    // Close upload modal
    $scope.closeUploadModal = function() {
        $scope.showUploadModal = false;
    };

    // Upload document
    $scope.uploadDocument = function() {
        try {
            if (!$scope.uploadForm.name || !$scope.uploadForm.documentKey) {
                $rootScope.showToast('Please fill in all required fields', 'error');
                return;
            }

            // Generate document key if not provided
            if (!$scope.uploadForm.documentKey) {
                var dept = $scope.currentUser.department.substring(0, 3).toUpperCase();
                var timestamp = Date.now();
                $scope.uploadForm.documentKey = dept + '-' + new Date().getFullYear() + '-' + timestamp;
            }

            var newDoc = DocumentService.uploadDocument({
                name: $scope.uploadForm.name,
                documentKey: $scope.uploadForm.documentKey,
                type: 'PDF',
                size: '1.5 MB',
                attachments: $scope.uploadForm.attachments
            });

            // Create notification
            NotificationService.createNotification({
                title: 'New Document Uploaded',
                message: newDoc.name + ' has been uploaded and is awaiting signature',
                type: 'info',
                relatedDocument: {
                    id: newDoc.id,
                    name: newDoc.name,
                    documentKey: newDoc.documentKey
                }
            });

            $rootScope.showToast('Document uploaded successfully', 'success');
            $scope.closeUploadModal();
            $scope.loadDocuments();
        } catch (error) {
            $rootScope.showToast(error.message, 'error');
        }
    };

    // Trigger file input click
    $scope.triggerFileInput = function() {
        document.getElementById('fileInput').click();
    };

    // Handle file selection
    $scope.handleFileSelect = function(files) {
        if (!files || files.length === 0) return;

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var fileObj = {
                name: file.name,
                size: file.size,
                sizeFormatted: formatFileSize(file.size),
                type: file.type,
                extension: getFileExtension(file.name),
                file: file
            };
            $scope.uploadForm.attachments.push(fileObj);
        }

        $scope.$apply();
    };

    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        var k = 1024;
        var sizes = ['Bytes', 'KB', 'MB', 'GB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    // Get file extension
    function getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toUpperCase();
    }

    // Remove attachment
    $scope.removeAttachment = function(index) {
        $scope.uploadForm.attachments.splice(index, 1);
    };

    // Download attachment (mock)
    $scope.downloadAttachment = function(attachment) {
        $rootScope.showToast('Downloading ' + attachment + '...', 'info');
    };

    // View PDF (mock)
    $scope.viewPDF = function(document) {
        $rootScope.showToast('Opening PDF viewer for ' + document.name, 'info');
    };

    // Get document statistics
    $scope.getDocumentStats = function() {
        return DocumentService.getDocumentStats();
    };

    // Initialize
    $scope.init();
}]);
